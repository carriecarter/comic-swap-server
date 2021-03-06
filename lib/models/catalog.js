const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comic: {
        type: Schema.Types.ObjectId,
        ref: 'Comic',
        required: true
    },
    condition: {
        type: String,
        enum: ['Good', 'Fine', 'Mint']
    },
    exchange: {
        type: String,
        enum: ['Own', 'Trade', 'Wishlist']
    }
});

schema.statics.getWishlist = function(userId) {
    return this.aggregate([
        { $match: {
            $and: [
                { user: mongoose.Types.ObjectId(userId) },
                { exchange: 'Wishlist' }
            ]
        }
        }
    ]);
};


module.exports = mongoose.model('Catalog', schema);