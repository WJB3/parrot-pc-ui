const path=require('path')
const SRC_PATH=path.resolve(__dirname,"../src");
const PACKAGE_PATH=path.resolve(__dirname,"../packages");

module.exports={
    entry:{
        main:["./src/index"]
    },
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            "@":path.resolve(__dirname,"../src"),
            "@packages":path.resolve(__dirname,'../packages')
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)/,
                loader:"babel-loader",
                exclude:/node_modules/, 
                include:[
                    SRC_PATH,
                    PACKAGE_PATH
                ]
            }, 
            {
                test:/\.svg$/,
                loader:"svg-sprite-loader"
            }, 
            {
				test:/\.(jpg|png|gif)$/,
				loader:'url-loader',
				options:{
                    name:'[name].[ext]',
                    outputPath:'images/',
                    limit:2048
				}
			}
        ]
    }
}