
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    amount: {type: Number, required: true},
    time: {type: String, required: true},
    summary: {type: String, required: true},
    advice: [
        {type: String}],
    author: {type: String, required: true},
    author_id: {type: Types.ObjectId, ref: 'User'},
    ingredients: {},
    instructions: [{
        type: String
    }],
    approved: {type: Boolean, required: true},
})

module.exports = model('Recipe', schema)