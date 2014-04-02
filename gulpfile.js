var gulp = require('gulp'),
    lr = require('tiny-lr'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    server = lr();


gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    gulp.watch('**/*.php', function (evt) {
        server.changed({
            body: {
              files: [evt.path]
            }
        });
    });

    gulp.watch('**/*.html', function (evt) {
        server.changed({
            body: {
              files: [evt.path]
            }
        });
    });

    gulp.watch('**/*.scss', function (evt) {
        gulp.run('compass');
    });
  });
});


gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
    .pipe(compass({
        config_file: './config.rb'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(livereload(server));
});


gulp.task('default', ['watch']);