const mix = require('laravel-mix');

// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new VuetifyLoaderPlugin()
//     ],
//   },
// }

var webpackConfig = {
    plugins: [
        new VuetifyLoaderPlugin(),
    ],
}

mix.webpackConfig(webpackConfig);





mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
