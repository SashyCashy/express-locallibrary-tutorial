var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);


AuthorSchema.
    virtual('name').
        get( function() {
            return this.family_name + ', ' + this.first_name;
        });


AuthorSchema.
    virtual('url').
        get( function () {
            return '/catalog/author/' + this._id;
        });

AuthorSchema.
    virtual('date_of_birth_format')
    .get(function () {
        return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
    });

AuthorSchema
    .virtual('date_of_death_format')
    .get( function () {
       return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
    });

AuthorSchema
    .virtual('lifespan')
    .get( function () {
        var x =  new moment(this.date_of_birth);
        var y = new moment(this.date_of_death);

       return moment.duration(y.diff(x)).years() > 0 ? moment.duration(y.diff(x)).years() : 'Invalid Dates';
    });
module.exports =  mongoose.model('Author', AuthorSchema);

