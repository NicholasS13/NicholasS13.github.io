import gulp from "gulp";
import plumber from "gulp-plumber";
import uglify from "gulp-uglify";
import sass from "gulp-sass";
import wait from "gulp-wait";
import babel from "gulp-babel";
import rename from "gulp-rename";

gulp.task("scripts", () =>
	gulp
		.src("./js/scripts.js")
		.pipe(
			plumber(
				plumber({
					errorHandler(err) {
						console.log(err);
						this.emit("end");
					},
				})
			)
		)
		["pipe"](babel({presets: [["@babel/env", {modules: false}]]}))
		["pipe"](uglify({output: {comments: "/^!/"}}))
		["pipe"](rename({extname: ".min.js"}))
		.pipe(gulp.dest("./js"))
);

gulp.task("styles", () =>
	gulp
		.src("./scss/styles.scss")
		.pipe(wait(250))
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
		.pipe(gulp.dest("./css"))
);

gulp.task("watch", () => {
	gulp.watch("./js/scripts.js", gulp.series("scripts"));
	gulp.watch("./scss/styles.scss", gulp.series("styles"));
});
