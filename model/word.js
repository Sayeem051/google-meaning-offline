const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wordSchema = new Schema(
    {
        word: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        group: {
            type: String,
            required: true,
            index: true
        },
        all_meanings: {
            type: [
                {
                    type: String,
                }
            ],
            _id: false,
            default: []
        },
        meanings: {
            type: [
                {
                    type: String,
                }
            ],
            _id: false,
            default: []
        },
        synonyms: {
            type: [
                {
                    type: String
                }
            ],
            _id: false,
            default: []
        },
        all_synonyms: {
            type: [
                {
                    type: String
                }
            ],
            _id: false,
            default: []
        }
    },
    {
        timestamps: true,
        collection: 'word'
    }
)
const Word = mongoose.model('word', wordSchema)
module.exports = { Word }