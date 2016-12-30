var gulp = require('gulp');
var elixir = require('laravel-elixir');
var _if = require('gulp-if');

elixir.config.assetsPath = 'source/_assets';
elixir.config.publicPath = 'source';

elixir(function(mix) {
    var isWindows = /^win/.test(require('os').platform());
    var jigsaw =_if(!isWindows, 'jigsaw build', 'jigsaw build');
    mix.sass('main.scss')
        .exec(jigsaw, ['./source/**/*', '!./source/_assets/**/*'])
        .browserSync({
            server: { baseDir: 'build_local' },
            proxy: null,
            files: [ 'build_local/**/*' ]
        });
});
