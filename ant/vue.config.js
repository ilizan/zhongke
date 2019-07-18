module.exports = {
    publicPath: './',//打包生成index.html里引入cssjs文件相对路径
    lintOnSave: false,//关闭eslint检查

    //通过配置文件自定义组件 注意：与main.js引入.less样式需同时修改
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 'primary-color': '#1DA57A',
                    // 'link-color': '#1DA57A',
                    // 'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    }
}