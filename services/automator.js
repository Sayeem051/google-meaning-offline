require('../configs/db/withoutTLS')
const xlsx = require('xlsx')
const path = require('path')
const { createWord, getWord, findListWord } = require('../helpers/word')
const browse = require('./oxfordLanguagesLite');

(async () => {
    let filePath = path.resolve(path.join(__dirname))
    let xlsxFile = xlsx.readFile(`${filePath}/word-list.xlsx`)

    let { 0: sheet } = xlsxFile.SheetNames
    let workSheet = xlsxFile.Sheets[sheet]

    let cells = Object.keys(workSheet)
    cells.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    let wordList = []
    let groups = []
    for (let i = 2; i < cells.length; i++) {
        let value = workSheet[`${cells[i]}`].h
        if (
            !(/Take Test [0-9]*/gm.test(value)) &&
            !(/Group [0-9]*/gm.test(value))
        ) {
            wordList.push({ value, group: current_group })
        }
        else if (/Group [0-9]*/gm.test(value)) {
            current_group = value
        }
    }

    wordList.sort((a, b) => parseInt(a.group.trim().split(' ')[1]) - parseInt(b.group.trim().split(' ')[1]))
    console.log({ true: Array.from(new Set(wordList.map(word => word.value))).length })

    let words = []
    for (let i = 0; i < wordList.length; i++) {
        do {
            words.push(wordList[i].value)
            if (wordList[i].group !== wordList[i + 1].group) {
                break
            }
            i++
            if (i == wordList.length - 1) {
                words.push(wordList[i].value)
                break
            }
        } while (true);
        groups.push({
            group: wordList[i - 1].group,
            words
        })
        words = []
    }
    // console.log(wor)
    let meaningObjects = []
    let logs = [];
    let newWb = xlsx.utils.book_new()
    let newWs = null
    let i = 0
    let result = null
    let word = 'cumbersome'
    // for (let groupIt = 0; groupIt < groups.length; groupIt++) {
    // for (let word of groups[groupIt].words) {
    result = await getWord({ word })
    if (!result) {
        result = await browse(word)
    }
    console.log(result)
    if (!Object.keys(result).includes('message')) {
        let created = result.createdAt ? true : await createWord({ group: 'Group 22', ...result })
        if (created) { console.log(created) }
    } else {
        // logs.push(result)
    }
    // meaningObjects.push(result)
    // console.log(`${i}/960 words have been saved to db`)
    // let now = new Date()
    // for (; 1;) {
    //     if (now <= new Date(new Date().getTime() - (1000 * 20))) {
    //         break
    //     }
    // }
    // }
    // meaningObjects = meaningObjects.filter(meaningObject => !!meaningObject)
    // newWs = xlsx.utils.json_to_sheet(meaningObjects.map(({ word, meanings, synonyms }) => ({ word, meanings: meanings.join('\n'), synonyms: synonyms.join(', ') })))
    // xlsx.utils.book_append_sheet(newWb, newWs, `${groups[groupIt].group}`)
    // meaningObjects = []
    // lastSavedWordIndex = 0
    // console.log(`${groups[groupIt].group} Complete (hopefully)`)
    // }
    // console.log(JSON.stringify(logs))
    // console.log(`All done${logs.length ? ', with few exceptions' : '!'}`)
    // xlsx.writeFile(newWb, 'Gregmat-words-with-meanings.xlsx')
})();
