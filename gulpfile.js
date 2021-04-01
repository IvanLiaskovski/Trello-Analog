const { src, dest, watch, series, parallel } = require("gulp");

const pipeline = require("readable-stream").pipeline;
const sourcemaps = require("gulp-sourcemaps");
const csso = require("gulp-csso");
const prefix = require("gulp-autoprefixer");
const babel = require("gulp-babel")
const jsmin = require("gulp-uglify");
const newer = require("gulp-newer");
const imgMin = require("gulp-imagemin");
const browserSync = require("browser-sync");

const configFiles = function () {
    return pipeline(
        src("src/config/*"),
        dest("dist/config"),
        browserSync.stream()
    );
}

const movePhp = function () {
    return pipeline(
        src("src/*.php"),
        dest("dist/"),
        browserSync.stream()
    );
}

const styles = function () {
    return pipeline(
        src("src/css/*.css"),
        sourcemaps.init(),
        prefix(),
        csso(),
        sourcemaps.write("."),
        dest("dist/css"),
        browserSync.stream()
    );
}

const scripts = function () {
    return pipeline(
        src("src/js/*.js"),
        sourcemaps.init(),
        babel({
            plugins: ['@babel/transform-runtime']
        }),
        // jsmin(),
        sourcemaps.write("."),
        dest("dist/js"),
        browserSync.stream()
    );
}

const img = function () {
    return pipeline(
        src("src/image/*"),
        newer("dist/image"),
        imgMin(),
        dest("dist/image")
    );
}

const server = function (cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });
    cb();
}

const observe = function (cb) {
    watch("src/**/*.php", { usePolling: true }, series(configFiles, movePhp));
    watch("src/css/*.css", { usePolling: true }, styles);
    watch("src/js/*.js", { usePolling: true }, scripts);
    cb();
}

exports.default = series(configFiles, movePhp, styles, scripts, img);
exports.movePhp = movePhp;
exports.configFiles = configFiles;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = parallel(server, observe);
