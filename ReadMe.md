ZionSky html signature files:

# mail signature generator

A tool to generate html for email signature.

Script generates html for each object from `indexData.js` array.

Use placeholders as `[[myPlaceholder]]` at `index.html` file.
Values for placeholders stores at `indexData.js` objects array.

It's also possible to create html email templates with this tool.

---


## Project's structure

- `index.html` - signature html markup
- `styles/mail.css` - styles for html
- `indexData.js` - objects array of users with placeholders data

---


### How to use
```bash
npm i
npm run build
```
<!--
1. Set your current host addr or a path to project dir into `localHostUrl` at `./index.js` file
```js
// index.js
const conf = {
	buildDir: './build/',
	sourceMarkupFile: './index.html',
}
```
-->

2. Customize `conf.sourceMarkupFile` file

3. Set user data at `indexData.js` file.
This will generate 2 files with `email` as fileName, ex. 'username.html', 'aleksandr.html'
```js
// example
[
{
	name: 'FirstName LastName',
	jobTitle: 'Spaceman',
	email: 'username',
	personalLink: 'tel:+0123456789', // href="[[personalLink]]"
	personalLinkText: '+01 2345 67 89',
},
{
	name: 'Aleksandr Kolesnichenko',
	jobTitle: 'Web Developer',
	email: 'hello',
	personalLink: 'https://t.me/ZionSkyNet',
	personalLinkText: 't.me/ZionSkyNet',
},
]
```

4. Generate html signature files with `npm run build` command.

5. Check generated files at `conf.buildDir` path

6. Copy-paste html content into email signature field at your email provider. For example, for Gmail https://support.google.com/mail/answer/8395?hl=en


---

#### Requirements
tested with nodejs v18 on windows10