const gulp = require('gulp');
const gutil = require('gulp-util');
const { spawn } = require('child_process');

let node;

const restart = () => {
    if (node) node.kill();
    node = spawn('node', ['server.js'], { stdio: 'inherit', cwd: 'dist/' });
    node.on('close', code => 
        code !== 0 ? gutil.log('Erro detectado, aguardando por mudanças') : 0
    );
}

gulp.task('default', () => 
    gulp.src('src/**/*')
        .pipe(gulp.dest('dist/'))
)

gulp.task('env-prod', ['default'], () => 
    gulp.src('src/environments/environment.prod.js')
        .pipe(gulp.dest('dist/environments/environment.js'))
);

gulp.task('env-test', ['default'], () => 
    gulp.src('src/environments/environment.test.js')
        .pipe(gulp.dest('dist/environments/environment.js'))
);

gulp.task('live', ['default'], () => {
    restart();
    const watcher = gulp.watch(['src/**/*.js'], ['default']);
    watcher.on('change', () => restart());
})