const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var dealsSchema = new Schema({
    fromUser: {
        type: String,
        required: true
    },
    toUser: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    bid: {
        type: String,
        default: null,
       
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});




const Deal = mongoose.model('Deal', dealsSchema);

module.exports = Deal;