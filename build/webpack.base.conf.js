const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const striptags = require('./strip-tags')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function wrap(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

module.exports = {
  entry: {
    app: './example/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('example'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('example'), resolve('test')]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          preprocess: (markdownIt, source) => {
            markdownIt.renderer.rules.table_open = () => '<table class="el-table">'
            markdownIt.renderer.rules.fence = wrap(markdownIt.renderer.rules.fence)
            return source
          },
          use: [
            [require('markdown-it-container'), 'demo', {
              // 用于校验包含demo的代码块
              validate: params => params.trim().match(/^demo\s*(.*)$/),
              render: (tokens, idx) => {
                var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                  var content = tokens[idx + 1].content;
                  var title = (m && m.length > 1) ? m[1] : '';
                  // 编译成html
                  const html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                  // 移除描述，防止被添加到代码块
                  tokens[idx + 2].children = [];

                  return `<demo-block>
                    <div slot="title">${title}</div>
                    <div slot="source">${html}</div>
                    ${html}
                    <div slot="highlight">`;
                }
                return '</div></demo-block>\n';
              }
            }]
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
