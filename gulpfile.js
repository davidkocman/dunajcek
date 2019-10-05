//
//          Terminal commands:
//          'gulp'          ---> for development
//          'gulp build'    ---> for distribution
//

//			Installation:
//			'npm init -y' - init without prompt
//			'npm install gulp@3.9.1 gulp-sass node-sass-globbing gulp-sourcemaps gulp-autoprefixer gulp-useref gulp-uglify gulp-if gulp-cssnano gulp-imagemin gulp-cache jshint gulp-jshint jshint-stylish browser-sync del run-sequence gulp-wait node-sass --save-dev'
//			'npm install [package-name] --save-dev'
//			'npm install @types/node --save-dev'

var gulp = require("gulp"); // the brain of this file
var concat = require('gulp-concat'); //concatenates files
var sass = require("gulp-sass"); // sass/scss - file preprocesor
var sassGlobbing = require("node-sass-globbing");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer"); // css vendor prefixing
var useref = require("gulp-useref"); // optimizing  files from multiple folders
var uglify = require("gulp-uglify"); // minify js
var gulpIf = require("gulp-if"); // only declared files
var cssnano = require("gulp-cssnano"); // minify css
var imagemin = require("gulp-imagemin"); // optimizing image files
var cache = require("gulp-cache");
var jshint = require("gulp-jshint"); // js error checking
var stylish = require("jshint-stylish"); // better reporter for jshint
var browserSync = require("browser-sync").create(); // browser syncing
var del = require("del"); // cleaning files that are no longer used
var runSequence = require("run-sequence"); // run tasks in sequence. Tasks in array runs simultaneously
var wait = require("gulp-wait"); // fix for sass mixins not being precessed

/*
// ***** VARS & VALS
*/
var sassIndex = "src/sass/index.scss";
var sassFiles = "src/sass/**/*.scss";
var htmlFiles = "src/*.html";
var custom_js_files = "src/js/main.js";
var other_js_files = "src/js/*/*.js";
var other_css_files = "src/css/*/*.css";
var fontFiles = "src/fonts/**/*";
var imgFiles = "src/media/images/**/*.+(png|jpg|jpeg|gif|svg|webp)";
var mediaFiles = "src/media/**/*";
var includes = "src/inc/**/*";

var cssOutput = "src/css/";
var jsOutput = "src/js";
var sassOptions = {
	errLogToConsole: true,
	outputStyle: "expanded", // compressed, expanded
	importer: sassGlobbing
};

/*
// ***** Development TASKS *****
// -----------------------------
*/

/*
// TASK: syncs brownser
*/
gulp.task("browserSync", function () {
	browserSync.init({
		server: {
			baseDir: "src"
		}
	});
});

/*
// task: SASS compile with autoprefixer and browser sync
*/
gulp.task("sass", function () {
	return gulp
		.src(sassIndex)
		.pipe(wait(100))
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on("error", sass.logError))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 2 versions", "> 5%", "Firefox ESR"]
			})
		)
		.pipe(sourcemaps.write())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(cssOutput))
		.pipe(browserSync.stream());
});

/*
// task: JAVASCRIPT error checking
*/
gulp.task("scripts", function () {
	return gulp
		.src(custom_js_files)
		.pipe(jshint())
		.pipe(
			jshint.reporter(stylish, {
				verbose: true
			})
		)
		.pipe(gulp.dest(jsOutput));
});

/*
// task: watches for sass changes and also reloads on .html/.js file change
*/
gulp.task("watch", function () {
	// Watch the input folder for change,
	gulp.watch(sassFiles, ["sass"]); // run `sass` task when something happens
	gulp.watch(custom_js_files, ["scripts"]); // run `scripts` task when js file saved
	gulp.watch(htmlFiles, browserSync.reload); // reload browser on .html change
	gulp.watch(custom_js_files, browserSync.reload); // reload browser on .js change
});

/*
// ***** Optimization TASKS *****
// ------------------------------
*/

/*
// TASK: optimizes/minifies .js/.css files from multiple folders into single one and moves all html files into 'public' folder
*/
gulp.task("useref", function () {
	return gulp
		.src("src/*.html")
		.pipe(useref())
		.pipe(gulpIf("*.js", uglify())) // Minifies only if it's a JavaScript file
		.pipe(gulpIf("*.css", cssnano())) // Minifies only if it's a CSS file
		.pipe(gulp.dest("public"));
});

/*
// TASK: optimizes images and moves into 'public' folder
*/
gulp.task("images", function () {
	return gulp
		.src(imgFiles)
		.pipe(
			cache(
				imagemin(
					[
						imagemin.gifsicle({
							interlaced: true
						}),
						imagemin.jpegtran({
							progressive: true
						}),
						imagemin.optipng({
							optimizationLevel: 5
						}),
						imagemin.svgo({
							plugins: [{
								removeViewBox: true
							}]
						})
					], {
						verbose: true
					}
				)
			)
		)
	// .pipe(gulp.dest("public/images"));
});

/*
// TASK: moves fonts, other scripts, styles and includes into public folder
*/
gulp.task("fonts", function () {
	return gulp.src(fontFiles).pipe(gulp.dest("public/fonts"));
});
gulp.task("move_media_files", function () {
	return gulp.src(mediaFiles).pipe(gulp.dest("public/media"));
});
gulp.task("move_other_scripts", function () {
	return gulp.src(other_js_files).pipe(gulp.dest("public/js"));
});
gulp.task("move_other_styles", function () {
	return gulp.src(other_css_files).pipe(gulp.dest("public/css"));
});
gulp.task("move_includes", function () {
	return gulp.src(includes).pipe(gulp.dest("public/inc"));
});

/*
// TASK: cleans 'public' folder before build
*/
gulp.task("clean:public", function () {
	return del.sync("public");
});

/*
// ***** Build Sequences *****
// ---------------------------
*/

/*
// TASK: for development
*/
gulp.task("default", function (callback) {
	runSequence("watch", ["sass", "scripts", "browserSync"], callback);
});

/*
// TASK: for build
*/
gulp.task("build", function (callback) {
	runSequence(
		"clean:public",
		"sass",
		"scripts",
		[
			"useref",
			"images",
			"fonts",
			"move_media_files",
			"move_other_scripts",
			"move_other_styles",
			"move_includes"
		],
		callback
	);
});


/* TODO: implement this 

npm install gulp-real-favicon --save-dev
-- gulp generate-favicon
-- gulp inject-favicon-markups

/****************************

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'TODO: Path to your master picture',
		dest: 'TODO: Path to the directory where to store the icons',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '0%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#2b5797',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'backgroundAndMargin',
				margin: '0%',
				backgroundColor: '#ffffff',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 94.375,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ 'TODO: List of the HTML files where to inject favicon markups' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('TODO: Path to the directory where to store the HTML files'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});
*/