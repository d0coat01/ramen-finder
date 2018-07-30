const express = require('express');

const app = express();

const yelp = require('yelp-fusion');

const apiKey = 'PoDcEfEWQkyhsel3NdFb8nXRzSOB4xl--evmuWY6JIEREE43fTb3IRKXrjQ0avWt3slnzUVZu-wRxxEcOHbtH8-Em--6FRIi2BY-3TvVJc7uw4IQfeURAbnWf1ZaW3Yx';
const client = yelp.client(apiKey);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/search-ramen', (req, res) => {
    client.search({
        term: 'ramen',
        location: 'san francisco, ca',
    }).then((response) => {
        console.log(response.jsonBody.businesses[0].name);
        res.send(response.jsonBody);
    }).catch((e) => {
        console.log(e);
        res.status(500);
        res.send(e);
    });
});

app.listen(3000, console.log('Yelp API running!'));
