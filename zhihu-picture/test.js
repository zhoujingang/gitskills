//var https = require('https');
//var request = require('request');
var fs = require('fs');
var path = require('path');
var webpage = require('webpage');
//var system = require('system');
//var rasterize =require('rasterize');
var page = webpage.create();
page.open('https://www.zhihu.com/question/34078228', function (status) {
    var data;
    if (status === 'fail') {
        console.log('open page fail!');
    } else {
//  	page.includeJs("download.js",function(){
    		var arr = page.evaluate(function() {
//	        	document.querySelector(".QuestionMainAction").click();
	        	
			    var imgs = document.querySelectorAll('noscript');
	        	var src_arr = [];
			    for (var i = 0;i < imgs.length;i++) {
					var src = imgs[i].innerHTML.match(/src="(\S*)"\s/)[1];
	//				console.log(.innerHTML);
					src_arr.push(src);
				}
			    return src_arr
			    
			});
//  	}) 
        page.render('html.png');
		console.log(arr[0]);
		fs.write('./url.txt',arr,'w');
//		for (var i = 0;i<arr.length ;i++) {
//			console.log(arr[i]);
//			request(arr[i]).pipe(fs.createWriteStream('./img/'+i+'.jpg')); 
//		}
//		var downloadPic = function(src, dest){
//		    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
//		        console.log('pic saved!')
//		    })
//		}
//		downloadPic(arr[0],'./img/1.jpg');

//		phantomjs rasterize arr[0] img;

		
//		async.mapSeries(arr,function(item, callback){
//		    setTimeout(function(){
//		        downloadPic(item, './img/'+ (new Date()).getTime() +'.jpg');
//		        callback(null, item);
//		    },400);
//		}, function(err, results){});
//		for (var i = 0;i<arr.length ;i++) {
//			console.log(arr[i]);
//			request(arr[i]).pipe(fs.createWriteStream('./img/'+i+'.jpg')); 
//		}
		
		

//		page.close();//关闭网页
//		phantom.exit();//退出phantomjs命令行



   };
    page.close();//关闭网页
    phantom.exit();//退出phantomjs命令行
});