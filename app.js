const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {  
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const appKey = "04deac8285368e45708b459e94d9a880";
    const url ="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+appKey;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const des = weatherData.weather[0].description;
            console.log(des);

            res.write("<h1>The temprature in " +query+ " is: "+temp+ ".</h1>");
            res.write("<h1>The weather description is: "+des+".</h1>");
            res.send();
        });
    });
});











app.listen(3000,function(){
    console.log('listening on port 3000');
})