# A simple blog constructed with Node.js
### Credit
Original Template
[https://github.com/cosmicjs/simple-blog](https://github.com/cosmicjs/simple-blog).

### Running instructions
Installation:
```
git clone https://github.com/vunamkhanh/sample-nodejs-project.git
cd khanh-blog
npm install
```
Getting started:
```
nodemon app.js
Go to [http://localhost:3000](http://localhost:3000) on Chrome.
```

#### Reference materials
Node.js and ExpressJS for server deployment, Cosmic JS for contents management system.

- Javascript Tutorial [https://javascript.info/](https://javascript.info/).
- Express Tutorial [https://www.tutorialspoint.com/expressjs/index.htm](https://www.tutorialspoint.com/expressjs/index.htm).
- Cosmic JS [https://cosmicjs.com/getting-started](https://cosmicjs.com/getting-started).
- How to build a blog [https://hackernoon.com/how-to-build-a-simple-blog-using-node-js-4ccdce39e78f](https://hackernoon.com/how-to-build-a-simple-blog-using-node-js-4ccdce39e78f).
- Original template Github - Blog content copied from [Wikipedia](https://en.wikipedia.org/wiki/Main_Page); images from [Pexels](https://www.pexels.com/).

#### Changes from the original template
1. Added the [**nodemon**](https://www.npmjs.com/package/nodemon) module for development testing; added the [**uncaught**](https://www.npmjs.com/package/uncaught) module for error interface; added the [**serve-favicon**](https://www.npmjs.com/package/serve-favicon) module for favicon requests from the browser.
2. Added clickable tags for each blog post and the functionality to sort posts by tags.
3. Removed **yarn.lock** since it causes compatibility problems between modules.
4. Fix an issue where the page would not stop loading if a post's url does not exist. An empty page warning is given instead.
5. Created a separate bucket on Cosmic JS for contents mangement, instead of having to install the app on the website.
6. Minor changes on page layout, title positioning, colour scheme etc for clarity.
7. Removed some unncessary html lines that can cause conflicts.
8. Added blank favicon.ico in /public/images/, since broweser requests can cause errors. Can be replaced with a real file for production.