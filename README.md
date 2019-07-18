![Munch Thai Logo](./public/assets/images/logo.png)
# Munch Thai Food & Sweet Tea

**Restaurant website & build tools**

## Deployment
Deployed: [Munchthai.com](https://www.munchthai.com)
Development Build: [GitHub Pages](https://aopenbrier.github.io/munchthai)  

## Development setup
Project uses Nodejs to execute JavaScript at command line interface.  
Check for Node at command prompt:
```bash
node --version
```
If you haven't already, install [Node.js](https://nodejs.org/en/download/)  
  
Clone the repository then run `npm i` at CLI in project directory

From within the `src` folder you can run the following gulp commands:
- `gulp css` - Auto-prefix and minimize css from `src/stylesheets` folder to `public/assets/css` folder
- `gulp javascript` - Transpile code to es5 and minimize JavaScript from `src/js` to `public/assets/js` folder
- `gulp deploy` - Deploy `public` folder to GitHub Pages. Note: Must have access to repository to commit.


## Technologies Used
- [Node.js](https://nodejs.org) - Execute JavaScript outside of the browser  
- [Gulp.js](httsp://gulpjs.com) - Streaming build system for front-end development  
- [Sass](https://sass-lang.com/) - Syntactically Awesome Style Sheets. CSS pre-processor  

## Author
Adam Openbrier  
 &bull; [Website](https://www.adamopenbrier.com/)  
 &bull; [GitHub](https://github.com/aOpenbrier)