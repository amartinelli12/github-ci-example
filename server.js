// Source: https://medium.com/better-programming/how-to-deploy-your-angular-9-app-to-heroku-in-minutes-51d171c2f0d

const express = require('express');

const app = express();

app.use(express.static('./github-search/dist/github-search'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'github-search/dist/github-search/'}),
);

app.listen(process.env.PORT || 8080);