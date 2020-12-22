const express = require('express');
const app = express();
const telegramBot = require('node-telegram-bot-api')
const token = '1483288023:AAEJRi3flF6Oh0X-VvvcHyCKeLqron-_SkQ'
const puppeteer = require('puppeteer');
const port = process.env.PORT || 8080;
const bot = new telegramBot(token, {polling:true}
const validUrl = require('valid-url');
require('https').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
  })
bot.on("polling_error", msg => console.log(msg))

bot.on("message",function(msg){

  bot.sendMessage(msg.chat.id,'Hi')
  bot.sendMessage(msg.chat.id,'200')
 bot.sendMessage(msg.chat.id,'koo')
  
});



var parseUrl = function(url) {
    url = decodeURIComponent('https://www.google.com/?hl=ar')
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }

    
    return url;
};

app.get('/', function(req, res) {
    var urlToScreenshot = parseUrl(req.query.url);

    if (validUrl.isWebUri(urlToScreenshot)) {
        console.log('Screenshotting: ' + urlToScreenshot);
        (async() => {
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();
            await page.goto(urlToScreenshot);
            await page.screenshot().then(function(buffer) {
                res.setHeader('Content-Disposition', 'attachment;filename="' + urlToScreenshot + '.png"');
                res.setHeader('Content-Type', 'image/png');
                res.send(buffer)
            });

            await browser.close();
        })();
    } else {
        res.send('Invalid url: ' + urlToScreenshot);
    }

});

app.listen(port, function() {
    console.log('App listening on port ' + port)
})
