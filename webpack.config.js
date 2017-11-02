/**
 * Created by Yoana on 9/12/2017.
 */
/**
 * Created by Yoana on 9/7/2017.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:'./public/client.js',
    output:{
        path:__dirname,
        filename: './public/client.min.js'
    },
    watch:true,
    module:{
        loaders:[
            {
                test:    /\.jsx?$/,
                loader:  'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime','react-html-attrs','babel-plugin-transform-class-properties','transform-decorators-legacy'],
                    presets:['es2015','react','stage-0']
                }
            }
        ]
    },
};
