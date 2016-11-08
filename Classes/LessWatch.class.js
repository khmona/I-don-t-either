'use strict';
var s = g.settings,
    once = true;

// gulp tasks for LESS compilation
module.exports = class LessWatch {
  constructor() {
    this.settings = s.LessWatch;
    this.paths = this.settings.paths;

    once && this.setup();
    once = false;
  }

  setup() {
    // create tasks
    this.tasks();
    m.gulp.start('less-watch');
  }

  tasks() {
    var me = this;
    m.gulp.task('build-css-from-less', [], function() {
      try {
        return m.gulp
          .src(me.paths.lessInput)
          .pipe(m.gulpless())
          .pipe(m.gulpcleancss())
          .pipe(m.gulp.dest(me.paths.cssOutput));
      } catch(e) {
        console.log("LESS compilation err\n\n", e.stack); return null;
      }
    });

    m.gulp.task('less-watch', ['build-css-from-less'], function() {
      m.gulp
        .watch(me.paths.watchDirs, ['build-css-from-less'])
        .on('change', me.reportChange);
    });
  }

  reportChange() {
    console.log("LESS files changed, new CSS generated...");
  }
};