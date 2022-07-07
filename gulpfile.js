
const gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	plugins = gulpLoadPlugins({pattern: '*'});

	plugins.browserSync.create();

var pipeline = require('readable-stream').pipeline;


//Compress and convert Functions

function cssConvert(done){

	gulp.src('./app/less/**/*.less')
		.pipe( plugins.sourcemaps.init())
		.pipe( plugins.less())
		.pipe( plugins.cleanCss({compatibility: 'ie8'}) )
		.on('error', console.error.bind(console))
		.pipe( plugins.autoprefixer(
						['> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'],
			{ cascade: false }))
		.pipe( plugins.rename({suffix: '.min'}) )
		.pipe( plugins.sourcemaps.write('./') )
		.pipe( gulp.dest('./app/css/') )
		.pipe( plugins.browserSync.stream() );

		done();
}


function jsCompress(done){

        gulp.src('./app/js/main.js')
        .pipe( plugins.uglifyEs.default() )
        .pipe( plugins.rename({suffix: '.min'}) )
        .pipe( gulp.dest('./app/js/min/') )
        .pipe( plugins.browserSync.stream() );

        done();

}

//Sync functions

function sync(done){

	plugins.browserSync.init({

		server: {
			baseDir: './'
		},
		port: 1030

	})
	done();
}

function browserReload(done){
	plugins.browserSync.reload();
	done();
}


function watchFiles(){
	gulp.watch('./**/**/**/*.html', browserReload);
	gulp.watch('./app/js/*.js', jsCompress);
	gulp.watch('./app/less/**/*', cssConvert);
}

/*Build and dirs*/

function dirs(done){

	return gulp.src('*.*', {read: false})
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('app/img'))
		.pipe(gulp.dest('app/js'))
		.pipe(gulp.dest('app/less'))
		.pipe(gulp.dest('app/scss'))
        .pipe(gulp.dest('app/libs'))
        .pipe(gulp.dest('app/fonts'))
		.pipe(gulp.dest('build'));

		done();

}
/*
function images(){

	let img = [];

}*/

function build(done){

	gulp.src('./app/less/**/*.less')
		.pipe( plugins.sourcemaps.init())
		.pipe( plugins.less())
		.pipe( plugins.cleanCss({compatibility: 'ie8'}) )
		.on('error', console.error.bind(console))
		.pipe( plugins.autoprefixer(
						['> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'],
			{ cascade: false }))
		.pipe( plugins.rename({suffix: '.min'}) )
		.pipe( plugins.sourcemaps.write('./') )
		.pipe( gulp.dest('./build/css/') );

	gulp.src('./app/js/main.js')
        .pipe( plugins.uglifyEs.default() )
        .pipe( plugins.rename({suffix: '.min'}) )
		.pipe( gulp.dest('./build/js/') );

	gulp.src('./app/img/*.png')
		.pipe( gulp.dest('./build/img') );

	gulp.src('./index.html')
		.pipe( gulp.dest('./build/') );

	done();

}

/*Additional functions*/

function dataPrint(done){

	console.log(plugins);
	done();

}

/*Tasks*/

gulp.task('default', gulp.parallel(sync, watchFiles));
gulp.task(jsCompress);
gulp.task(dirs);
gulp.task(build);
gulp.task(dataPrint);





 