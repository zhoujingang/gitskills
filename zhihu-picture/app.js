var https = require('https');
var fs = require('fs');
var superagent = require('superagent');
var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var app = express();

app.get('/',function(req,res,next){
	superagent.get('https://www.zhihu.com/question/34078228').end(function(err,sres){
		if(err){
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var item=[];
		$('.List-item').each(function(idx,element){
			var $element = $(element);
			let src = $element.attr('src');
			item.push({
				index: idx,
				name: $element.html()
				title:$element.attr('alt'),
				src:$element.attr('src')
			});
			savedImg(idx,src);
		});
		res.send(html);
	});
});
app.listen(3000,function(req,res){
	console.log("app is running at port 3000");
})



/*function savedContent($, news_title) {
    $('.article-content p').each(function (index, item) {
        var x = $(this).text();       

       var y = x.substring(0, 2).trim();

        if (y == '') {
        x = x + '\n';   
//将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
        fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    })
}*/
//该函数的作用：在本地存储所爬取到的图片资源
function savedImg(idx,src) {
//  $('.article-content img').each(function (index, item) {
//      var img_title = $(this).parent().next().text().trim();  //获取图片的标题
//      if(img_title.length>35||img_title==""){
//       img_title="Null";}
//      var img_filename = img_title + '.jpg';
		var img_name = idx + '.jpg';
        var img_src = src ; //获取图片的url

//采用request模块，向服务器发起一次请求，获取图片资源
	
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+img_name));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
//  })
}