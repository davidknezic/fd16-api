import path from 'path'
import merge from 'merge-stream'
import gulp from 'gulp'
import watch from 'gulp-watch'
import gutil from 'gulp-util'
import notifier from 'node-notifier'

import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'

import less from 'gulp-less'
import pseudoelements from  'postcss-pseudoelements'
import autoprefixer from 'autoprefixer'
import csswring from 'csswring'

import babelify from 'babelify'
import browserify from 'browserify'
import minifyify from 'minifyify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

gulp.task('watch', ['bundle'], (cb) => {
  watch([
    'src/**/*.less',
    'src/**/*.js',
    '!src/**/*.min.js'
  ], () => gulp.start('bundle'))
    .on('error', handleError('bundling failed!'))
})

gulp.task('bundle', () => {
  const lss = gulp.src('src/**/index.less')
    // TODO: Re-enable sourcemaps when gulp-sourcemaps gets fixed
    //.pipe(sourcemaps.init())
    .pipe(less({
      paths: [
        path.join(__dirname, 'node_modules', '@axa-ch', 'style-guide', 'less')
      ]
    }))
    .pipe(postcss([
      autoprefixer(),
      pseudoelements(),
      csswring()
    ]))
    .pipe(rename((path) => {
      path.basename = 'app'
      path.extname = '.min.css'
    }))
    /*.pipe(sourcemaps.write('.', {
      sourceRoot: './'
    }))*/

  const js = browserify({ debug: true })
    .transform(babelify)
    .plugin(minifyify, {
      minify: true,
      output: 'src/app.min.js.map'
    })
    .add('src/index.js')
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())

  return merge(lss, js)
    .pipe(gulp.dest('src'))
})

function handleError(title) {
  return (err) => {
    var title = err.name
    var message = err.message

    if (err.line && err.column) {
      message = `at ${err.line}:${err.column}`
    }

    if (err.filename) {
      const filename = path.basename(err.filename)
      title = `${err.name} in ${filename}`
    }

    gutil.log(title, message)

    notifier.notify({
      title: title,
      message: message
    })

    this.emit('end')
  }
}
