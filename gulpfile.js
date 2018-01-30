"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");

gulp.task("less", function () {
    return gulp.src("app/less/**/*.less")
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("app/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("webp", function(){
    return gulp.src("img/**/*.{png,jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("img"));
});

gulp.task("images", function(){
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("img"));
});

gulp.task("scripts", function(){
    return gulp.src([
        "app/libs/jquery/dist/jquery.min.js",
        "app/libs/magnific-popup/dist/jquery.magnific-popup.min.js"
    ])
    .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("app/js"));
});

gulp.task("browserSync", function () {
    browserSync({
        server: {
            baseDir: "app"
        },
        notify: false
    });
});

gulp.task("watch", ["browserSync", "less", "scripts"], function () {
    gulp.watch("app/less/**/*.less", ["less"]);
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/js/**/*.js", browserSync.reload);
});

gulp.task("webp", function(){
    return gulp.src("app/img/**/*.{png,jpg}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("app/img"));
});

gulp.task("images", function(){
    return gulp.src("app/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("app/img"));
});

