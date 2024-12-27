const conf = {
	sourceMarkupFile: './zionsky.html',
	// sourceMarkupFile: './hello-html-signatures.html',
	// sourceMarkupFile: './index.html',
	buildDir: './build/',
	//
	// localHostUrl: 'http://localhost:5500', // project's localhost(server addr)
	// localHostUrl: 'http://169.254.88.196:5500',
	localHostUrl: 'file://'+ __dirname + '/', // it works, no need to change per proj
}
// import users array
// const dataArr = require('./indexDataOne.js');
const dataArr = require('./indexData.js');

// script dependencies
const fs = require('fs');
const mime = require('mime-types');
// https://www.npmjs.com/package/inline-css
const inlineCss = require('inline-css');
// https://www.npmjs.com/package/html-minifier
const minify = require('html-minifier').minify;
// https://www.npmjs.com/package/jsdom
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let initialHtml = fs.readFileSync(conf.sourceMarkupFile, 'utf8');


if (!fs.existsSync(conf.buildDir)){
	fs.mkdirSync(conf.buildDir);
}
/*
// convert imgs to base64 and inject into html
initialHtml = initialHtml.replace(/src=".*?"/g, function(matchedKey) {
	matchedKey = matchedKey.replace(/\s/g, '').replace(/src=/g, '').replace(/"/g, '');
	let base64Str = fs.readFileSync(matchedKey, 'base64');
	return 'src="data:'+mime.lookup(matchedKey)+';base64,'+base64Str+'"';
});
*/

dataArr.forEach( async function(data) {

	var html = initialHtml;


	// replace placeholders from data arr
	for (let key in data) {
		html = html.replace(/\[\[.*?\]\]/g, function(matchedKey) {
			matchedKey = matchedKey.replace(/\s/g, '').replace(/\[\[/g, '').replace(/\]\]/g, '');
			if (data[matchedKey] !== undefined) {
				return data[matchedKey]
			}
		});
	}


	await inlineCss(html, {
		removeHtmlSelectors: true,
		url: conf.localHostUrl,
	})
	.then(function(html) {

		let domTree = new JSDOM(html);
		html = domTree.window.document.body.innerHTML;


		html = minify(html, {
			// removeAttributeQuotes: true,
			removeAttributeQuotes: false,
			caseSensitive: true,
			minifyCSS: true,
			removeComments: true,
			maxLineLength: 0,
			collapseWhitespace: true,
		});

		fs.writeFile(conf.buildDir+data.email+'.html', html, (err) => {
			if (err) {
				console.error(err)
			} else {
				console.log(data.name +' -> '+data.email + '.html')
			}
		})
	});

});
