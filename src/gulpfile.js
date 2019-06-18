const gulp = require('gulp')
const { task, src } = gulp
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssnano')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cssInput = './stylesheets/*.scss'
const cssOutput = '../public/assets/css'
const jsInput = './js/*.js'
const jsOutput = '../public/assets/js'
const ghPages = require('gh-pages');

task('css', () => 
        // Find all `.scss` files from the `stylesheets/` folder
        src(cssInput)
        // Run Sass on those files
        .pipe(sass().on('error', sass.logError))
        // Add vendor prefixes for browsers over 5% of US usage
        .pipe(autoprefixer('>1% in US'))
        //Minify the css
        .pipe(cssmin())
        // Write the resulting CSS in the public folder
        .pipe(gulp.dest(cssOutput))
)

task('javascript', () => 
    src(jsInput)
    // transpile to es2015
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // minify/uglify js
    .pipe(uglify())
    // Write to public folder
    .pipe(gulp.dest(jsOutput))
)


task('deploy', function(done) {
    ghPages.publish('../public', function (err) { if(err) {console.log(err)} })
    done()
})
