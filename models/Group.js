const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true 
    },

    members: {
        type: Array,
        required: true
    }, 

    acts: {
        type: Array,
        default: []
    }
});

module.exports = Group = mongoose.model('groups', GroupSchema);