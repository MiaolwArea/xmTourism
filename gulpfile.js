var gulp = require('gulp')
    , gulpLoadPlugins = require('gulp-load-plugins') 
    , browserSync = require('browser-sync');

;
var $ = gulpLoadPlugins()
    , reload = browserSync.reload;


// gulpLoadPlugins.minifycss = require('gulp-minify-css');

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['css'], function() {
    browserSync.init({
        server: "./src"
    });

    // 监听html
    gulp.watch('./src/*.html', ['html'])
    // 监听css
    gulp.watch('./src/scss/public.scss', ['css']);
    // 监听images
    gulp.watch('./src/images/**/*', ['images']);
    // 监听js
    gulp.watch('./src/js/*.js', ['js']);
});
// scss编译后的css将注入到浏览器里实现更新
gulp.task('css', function() {
    var cssSrc = './src/scss/*.scss',
        compilefile = './src/scss';
        cssDst = './dist/css';

    return gulp.src(cssSrc)
        .pipe($.sass.sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss())
        .pipe(gulp.dest(compilefile))
        .pipe(gulp.dest(cssDst))
        .pipe(reload({stream: true}));
});
// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst))
        .pipe(reload({stream: true}));
});
// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe($.imagemin())
        .pipe(gulp.dest(imgDst));
})
// js处理
gulp.task('js', function () {
    // var jsSrc = ['libs/jquery/dist/jquery.min.js','libs/angular/angular.js','libs/angular/angular-ui-router.js','libs/angular-animate/angular-animate.min.js',
    //     'libs/angular-touch/angular-touch.min.js','libs/angular-bootstrap/ui-bootstrap-tpls.min.js','libs/angular-messages/angular-messages.min.js', './src/js/*.js'],
    //     jsDst ='./dist/js';

    // gulp.src(jsSrc)
    //     .pipe($.jshint())
    //     .pipe($.jshint.reporter('default'))
    //     .pipe($.concat('main.js'))
    //     .pipe($.rename({ suffix: '.min' }))
    //     .pipe($.uglify())
    //     .pipe(gulp.dest(jsDst))
    //     .pipe(reload({stream: true})); 
    gulp.src('js/**/*')
        .pipe($.concat('main.js'))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe(gulp.dest('./src/js/'))
        .pipe(reload({stream: true})); 
});
// 文件复制
gulp.task('copy', function () {
    // var jsSrc = ['./src/font/**/*', './src/scss/*.min.css', './src/libs/angular/*.min.js', './src/libs/angular/angular-ui-router.js',
    //     './src/libs/bootstrap/dist/css/*.min.css', './src/libs/bootstrap/dist/js/*.min.js', './src/libs/jquery/dist/*.min.js',],
        // jsDst = ['./dist/font', './dist/css', './dist/libs'];
    gulp.src('./src/font/**/*')
        .pipe(gulp.dest('./dist/font'));
    gulp.src('./src/config.ini')
        .pipe(gulp.dest('./dist')); 
    gulp.src('./src/ui/*.html')
        .pipe(gulp.dest('./dist/ui'));   
    gulp.src('./src/data/**/*')
        .pipe(gulp.dest('./dist/data'));
});
// 静态资源路径替换
gulp.task('usemin', function() {
  return gulp.src('./src/index.html')
    .pipe($.usemin({
      js: [],
      css: []
    }))
    .pipe(gulp.dest('dist/'));
});
// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js', './dist/images', './dist/font'], {read: false})
        .pipe($.clean());
});

gulp.task('default', ['clean'], function(){
    gulp.start('html', 'images', 'css', 'js', 'copy',  'usemin');
});
