
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    time: {type: String, required: true},
    amount: {type: String, required: true},
    summary: {type: String, required: true},
    advice: {type: String, required: true},
    author: {type: String, required: true},
    author_id: {type: Types.ObjectId, ref: 'User'},
    ingredients: {}
})

module.exports = model('Recipe', schema)