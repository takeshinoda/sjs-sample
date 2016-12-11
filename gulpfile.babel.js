import 'babel-register'
import 'babel-polyfill'
import gulp    from 'gulp'
import babel   from 'gulp-babel'
import mocha   from 'gulp-mocha'
import zip      from 'gulp-zip'
import install  from 'gulp-install'

import runSequence from 'run-sequence'
import awsLambda   from 'node-aws-lambda'

const SOURCES    = ['src/**/*.js']
const TEST_FILES = ['test/**/*_test.js', '!test/fixtures/*.js']

gulp.task('test', ['compile'], () => {
  return gulp.src(TEST_FILES)
             //.pipe(mocha({ timeout: 25000, reporter: 'nyan' }))
             .pipe(mocha({ timeout: 25000, reporter: 'dot' }))
})

gulp.task('compile', () => {
  return gulp.src(SOURCES)
             .pipe(babel())
             .pipe(gulp.dest('dist'))
})

gulp.task('install', () => {
  return gulp.src('package.json')
             .pipe(gulp.dest('dist'))
             .pipe(install({ production: true }))
})

gulp.task('zip', () => {
  return gulp.src(['dist/**/*'])
             .pipe(zip('dist.zip'))
             .pipe(gulp.dest('./'))
})

gulp.task('build', done => runSequence('compile', 'install', 'zip', done))

gulp.task('deploy', ['build'], (done) => {
  awsLambda.deploy('./dist.zip', require('config').lambda_params, done)
})

gulp.task('default', (done) => runSequence('compile', 'test', done))

