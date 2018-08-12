var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
        name: { type : String, required: true, min: 3, max: 100 },
        category: { type: String, enum: ['Fiction', 'Non-Fiction', 'Romance', 'Military', 'Adventure'], default: 'Romance', required: true }
    });

GenreSchema.
    virtual('url').
        get( function () {
           return '/catalog/genre/' + this._id;
    });

module.exports = mongoose.model('Genres', GenreSchema);