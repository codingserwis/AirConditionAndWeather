var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    sourceMaps = require('gulp-sourcemaps'),
    autoPrefixer = require('gulp-autoprefixer'),
    gulpif = require('gulp-if'),
    babel = require('gulp-babel'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json');


// sass compilation
gulp.task('sass', function() {
    return gulp.src('prod/sass/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({browsers: ['last 2 versions']}))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

// run after all finished tu delete unused css
gulp.task('uncss', function() {
    return gulp.src('prod/sass/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(uncss({
            html: ['dist/*.html']
        }))
        .pipe(autoPrefixer({browsers: ['last 2 versions']}))
        .pipe(sourceMaps.write('./maps'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

// copying files and uglify js 
gulp.task('copy', function() {
    return gulp.src('prod/**/*.+(html|js)')
        //.pipe(gulpif('*.js', sourceMaps.init()))
        //.pipe(gulpif('*.js', babel({presets: ['es2015']})))
        //.pipe(gulpif('*.js', uglify()))
        //.pipe(gulpif('*.js', sourceMaps.write('.')))
        //.pipe(gulpif('*.js', gulp.dest('dist/assets/')))
        .pipe(gulpif('*.html', gulp.dest('dist')))
        .pipe(browserSync.stream());
});

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

// TypeScript
gulp.task('typescript', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());

        return tsResult
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});






// gulp.task("typescript", function () {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest("dist/assets/js"))
//         .pipe(browserSync.stream());
// });
// gulp.task('typescript', function() {
//     return tsProject.src()
//         .pipe(tsProject())
//         .js.pipe(gulp.dest('dist/assets/js'));
// });
// gulp.task('typescript', function () {
//     return gulp.src('prod/**/*.ts')
//         .pipe(ts({
//             noImplicitAny: true,
//             outFile: 'output.js'
//         }))
//         .pipe(gulp.dest('dist/assets/js'));
// });

// watch for files
gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('prod/sass/**/*.scss', ['sass']);
    gulp.watch('prod/**/*.+(html|js)', ['copy']);
    gulp.watch('prod/**/*.ts', ['typescript']);
});

// gulp default task
gulp.task('default', ['watch']);






