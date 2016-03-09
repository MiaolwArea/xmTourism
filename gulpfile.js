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

    return gulp.src(cssSrc)
        .pipe($.sass.sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.minifyCss())
        .pipe(gulp.dest(compilefile))
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
    var jsSrc = './src/js/*.js',
        jsDst ='./dist/js';

    gulp.src(jsSrc)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.concat('main.js'))
        .pipe(gulp.dest(jsDst))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe(gulp.dest(jsDst))
        .pipe(reload({stream: true})); 
});
// 文件复制
gulp.task('copy', function () {
    // var jsSrc = ['./src/font/**/*', './src/scss/*.min.css', './src/libs/angular/*.min.js', './src/libs/angular/angular-ui-router.js', './src/libs/bootstrap/dist/css/*.min.css', './src/libs/bootstrap/dist/js/*.min.js', './src/libs/jquery/dist/*.min.js',],
    //     jsDst = ['./dist/font', './dist/css', './dist/libs'];
    // for(var i in jsSrc){
    //     if(i == 0){
    //         gulp.src(jsSrc[i])
    //             .pipe(gulp.dest(jsDst[0]));
    //     }else if(i == 1){
    //         gulp.src(jsSrc[i])
    //             .pipe(gulp.dest(jsDst[1]));
    //     }else{
    //         gulp.src(jsSrc[i])
    //             .pipe(gulp.dest(jsDst[2]));
    //     }
    // }
    gulp.src('./src/config.ini')
        .pipe(gulp.dest('./dist')); 
    gulp.src('./src/ui/*.jsp')
        .pipe(gulp.dest('./dist/ui'));   
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
    gulp.start('html', 'images', 'css', 'copy', 'js', 'usemin');
});
