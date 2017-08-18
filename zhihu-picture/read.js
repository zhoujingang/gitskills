var fs = require('fs');
var request = require('request');
var async = require('async');
fs.readFile('url.txt','utf-8',function(err,data){
	if(err){
		console.log(err);
	}else{
		var arr = data.split(',');
		async.mapSeries(arr,function(item,callback){
			setTimeout(function(){
				savedImg(item,new Date().getTime()+'.jpg');
				callback(null,item);
			},400)
		},function(err,results){});
	}
})
//var downloadPic = function(src, dest){
//request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
//  console.log('pic saved!')
//})
//}
//async.mapSeries(imgList,function(item, callback){
//setTimeout(function(){
//  downloadPic(item, './catpics/'+ (new Date()).getTime() +'.jpg');
//  callback(null, item);
//},400);
//}, function(err, results){});

function savedImg(src,idx) {

		var img_name = idx + '.jpg';
        var img_src = src ; //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
	
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./img/'+img_name)).on('close',function(){
        	console.log('pic saved!')
        });     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
//  })
}