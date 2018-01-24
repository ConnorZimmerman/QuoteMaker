var quote = require('../controllers/quote.js');
var path = require("path");
module.exports = function (app) {
    app.post('/add_quote', function (req, res) {
        quote.addQuote(req, res);
    })
    app.get('/grab_all_quotes', function (req, res) {
        quote.grabAllQuotes(req, res);
    })
    app.get('/add_like/:id', function (req, res) {
        quote.addLike(req, res);
    })
    app.get('/delete/:id', function (req, res) {
        quote.delete(req, res);
    })
    app.post('/login', function (req, res) {
        quote.login(req, res);
    })
    app.get('/dashboard_backend', function (req, res) {
        quote.checkSession(req, res);
    })
    app.get('/logout', function (req, res) {
        quote.clearSession(req, res);
    })
    app.all("**", (request, response) => { response.sendFile(path.resolve("./client/dist/index.html")) });
}