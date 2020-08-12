const path=require('path')
const SRC_PATH=path.resolve(__dirname,"../src");

module.exports={
    entry:{
        main:"./src/index"
    },
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            "@":path.resolve(__dirname,"../src")
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)/,
                loader:"babel-loader",
                include:SRC_PATH,
                exclude:/node_modules/,
                include:/src/
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