var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    QuoteSchema = new Schema({
        content: String,
        userName: String,
        Likes: {
            type : Number,
            default : 0
        }
    })
mongoose.model('Quote', QuoteSchema);