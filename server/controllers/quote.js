var mongoose = require("mongoose"),
    Quote = mongoose.model('Quote');
module.exports = {
    addQuote: function (req, res) {
        Quote.create({ content: req.body.content, userName: req.session.user }, function (err, quote) {
            res.json({ quote: quote });
        })
    },
    grabAllQuotes: function (req, res) {
        Quote.find({}, function (err, quotes) {
            res.json(quotes);
        })
    },
    addLike: function (req, res) {
        Quote.findOneAndUpdate({ _id: req.params.id }, { $inc: { Likes: 1 } }, function (err, quote) {
            console.log(quote);
            return res.redirect('/');
        })
    },
    delete: function (req, res) {
        Quote.remove({ _id: req.params.id }, function (err, quote) {
            return res.redirect('/');
        })
    },
    login: function (req, res) {
        req.session.user = req.body.name;
        return res.json({ user: req.session.user });
    },
    checkSession: function (req, res) {
        if (!req.session.user) {
            return res.json({ user: null });
        } else {
            return res.json({ user: req.session.user });
        }
    },
    clearSession: function (req, res) {
        req.session.destroy();
        return res.redirect('/');
    }
}