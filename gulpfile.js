const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

function scripts(){
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}
function scriptsEn(){
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'app/js/main-en.js',
    ])
        .pipe(concat('main-en.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles(){
    return src([
        'app/scss/style.scss'
    ])
        .pipe(concat('style.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}
function stylesEn(){
    return src([
        'app/scss/style-en.scss'
    ])
        .pipe(concat('style-en.min.css'))
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching(){
    watch(['app/scss/style.scss'], styles)
    watch(['app/scss/style-en.scss'], stylesEn)
    watch(['app/scss/_media.scss'], styles)
    watch(['app/scss/_media.scss'], stylesEn)
    watch(['app/scss/_global.scss'], styles)
    watch(['app/scss/_global.scss'], stylesEn)
    watch(['app/js/main.js'], scripts)
    watch(['app/js/main-en.js'], scriptsEn)
    watch(['app/*.html']).on('change', browserSync.reload)
}

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
    
}

function cleanDist(){
    return src('dist')
        .pipe(clean())
}

function building(){
    return src([
        'app/css/style.min.css',
        'app/css/style-en.min.css',
        'app/img/*.*',
        'app/js/main.min.js',
        'app/js/main-en.min.js',
        'app/**/*.html'
    ], {base : 'app'})
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.stylesEn = stylesEn;
exports.scripts = scripts;
exports.scriptsEn = scriptsEn;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, stylesEn, scripts, scriptsEn, browsersync, watching)