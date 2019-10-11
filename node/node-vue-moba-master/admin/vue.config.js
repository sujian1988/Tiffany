  module.exports = {  
  outputDir: __dirname + '/../server/admin', //__dirname表示当前的文件，outputDir表示打包上线生成的路径，..表示返回上级目录，在进入server的admin目录下
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}