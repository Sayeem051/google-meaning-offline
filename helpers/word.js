const { Word } = require('../model/word')

module.exports = {
    createWord: async (body) => {
        try {
            let created = await Word(body).save()
            return created
        } catch (error) {
            console.log(JSON.stringify(error))
            return null
        }
    },
    getWord: async (filter, projection = null, options = null) => {
        try {
            let found = await Word.findOne(filter, projection, options)
            return found
        } catch (error) {
            console.log(JSON.stringify(error))
            return null
        }
    },
    findListWord: async (filter, projection = null, options = null) => {
        try {
            let words = await Word.find(filter, projection, options)
            return words
        } catch (error) {
            console.log(JSON.stringify(error))
            return null
        }
    }
}