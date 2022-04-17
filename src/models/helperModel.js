var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HelperSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    platform: {
        type:String,
        enum: ["PC","PLAYSTATION","XBOX"],
        required: true
    },
    bosses: {
        type:[String],
        required: true
    },
    password: {
        type:String,
        required: true
    },
})

module.exports = Helper = mongoose.model('helper',HelperSchema);