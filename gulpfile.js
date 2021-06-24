// let fileinclude = require('gulp-file-include');

// папка, в которой будет собираться проект и ее выгружают на сервер
const project_folder = "dist";
// имя папки с исходникми
const source_folder = "assets";

const fs = require("fs");

// содержит все пути к папкам и файлам
const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
    iconsfont: project_folder + "/iconfont/",
  },
  assets: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
    iconsfont: source_folder + "/iconfont/",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/*.scss",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/*.{jpg,png,svg,gif,ico,webp}",
    iconsfont: source_folder + "/iconfont/",
  },
  clean: "./" + project_folder + "/",
};
// scr, dest испльзую в функции html
const { src, dest } = require("gulp");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
const webpcss = require("gulp-webpcss");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const concat = require("gulp-concat");

// настраиваю сервер
function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

// функция для работы с html files
function html() {
  return src(path.assets.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function css() {
  return src(path.assets.css)
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 version"],
        cascade: true,
      })
    )
    .pipe(group_media())
    .pipe(webpcss({ webpClass: ".webp", noWebpClass: ".no-webp" }))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(concat("index.css"))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

// функция для работы с js files
function js() {
  return src(path.assets.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

// для svg спрайтов, не добавлена в отслеживаемые файлы, т.к достаточно запустить ее 1 раз (gulp scgSprite). В процессе сборки все svg собираются ы 1 файл (../iconsprite/icons2.svg)
// example: true Добавляеи папку stack, где можно посмотреть как правильно подключить спрайты
gulp.task("svgSprite", function () {
  return gulp
    .src(["assets/img/iconsprite/*.svg"])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../iconsprite/icons2.svg", //sprite file name
            example: true,
          },
        },
      })
    )
    .pipe(dest(path.build.img));
});
// функция для работы с images files
function images() {
  return src(path.assets.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.assets.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, //0 to7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

// подкючение шрифтов
function fonts() {
  src(path.assets.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));

  return src(path.assets.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}

// одельная задача для конвертации otf шрифта ttf, выгружаю в папку с исходникми ко всем остальным шрифтам в ttf, а потом все вместе конвертирую в woff (woff2) с помощью функции fonts
gulp.task("otf2ttf", function () {
  return src([source_folder + "/fonts/*.otf"]) //путь к исходнику
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(source_folder + "/fonts/")); // путь к исходнику, где лежат все шрифты в ttf-формате
});
// удалять dist
function clean() {
  return del(path.clean);
}

// отслеживать изменения и сразу компилировать их в браузер,пишу на scss но в результате нужно получить css, вторым параметром передается название функции
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

// запись и подключение шрифтов к файлу стилей
// function connectFonts2StyleScc() {
//   let file_content = fs.readFileSync(source_folder + "/scss/fonts.scss");
//   if (file_content == "") {
//     fs.writeFile(source_folder + "/scss/fonts.scss", "", cb);
//     return fs.readdir(path.build.fonts, function (err, items) {
//       if (items) {
//         let c_fontname;
//         for (var i = 0; i < items.length; i++) {
//           let fontname = items[i].split(".");
//           fontname = fontname[0];
//           if (c_fontname != fontname) {
//             fs.appendFile(
//               source_folder + "/scss/fonts.scss",
//               '@include font("' +
//                 fontname +
//                 '", "' +
//                 fontname +
//                 '", "400", "normal");\r\n',
//               cb
//             );
//           }
//           c_fontname = fontname;
//         }
//       }
//     });
//   }
// }
// callback, необходимый для автоматического пдключения шрифтов к основному scss файлу
// function cb() {
//   console.log("call back");
// }

let build = gulp.series(
  clean,
  gulp.parallel(js, css, html, images, fonts)
);
let watch = gulp.parallel(build, watchFiles, browserSync);

// exports.connectFonts2StyleScc = connectFonts2StyleScc;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.build = build;
exports.html = html;
exports.watch = watch;
exports.default = watch;
