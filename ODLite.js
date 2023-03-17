const puppeteer = require('puppeteer')

let browse = () => {
    (async () => {
        let browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://www.google.com/search?q=dread+meaning');

        let meanings = []
        let POSs = []
        let synonyms = []
        let relateds = []
        try {
            let meaningElements = await page.$$('div.LTKOO.sY7ric')
            let posElements = await page.$$('div.YrbPuc.vdBwhd.pgRvse')
            let synonymElements = await page.$$('div.EmSASc.gWUzU.MR2UAc.F5z5N.jEdCLc.LsYFnd.p9F8Cd.I6a0ee.rjpYgb.gjoUyf')
            let relatedElements = await page.$$('div.bqVbBf.jfFgAc.CqMNyc div')
            for (let meaningElement of meaningElements) {
                meanings.push(await page.evaluate((el) => el.querySelector('[data-dobid]').textContent, meaningElement))
            }
            for (let posElement of posElements) {
                POSs.push(await page.evaluate((el) => el.querySelector('.YrbPuc').textContent, posElement))
            }
            for (let relatedElement of relatedElements) {
                relateds.push(await page.evaluate(el => el.textContent, relatedElement))
            }
            for (let synonymElement of synonymElements) {
                synonyms.push(await page.evaluate((el) => el.textContent, synonymElement))
            }
        } catch (error) { }
        await browser.close()
        let k = 0
        let l = 0
        for (let i = 0; i < relateds.length - 1; i++) {
            if (['h', ''].includes(relateds[i].trim())) continue
            if (relateds[i] !== relateds[i + 1]) {
                relateds[l++] = relateds[i]
            }
        }
        synonyms = Array.from(new Set(synonyms))
        let allSynonyms = []
        relateds = relateds.slice(0, l)
        l = 0
        let flag = false
        for (let related of relateds) {
            // বিপরীত: 2476
            // একইরকম: 2447
            let char = related.charCodeAt(0)
            if (char == 2476) {
                flag = true
            }
            if (flag) {
                if (char !== 2447) {
                    continue
                } else {
                    flag = false
                }
            }
            if (char == 2447) {
                continue
            }
            allSynonyms[l++] = related
        }
        synonyms = synonyms.map(synonym => { if (allSynonyms.includes(synonym)) return synonym }).filter(word => !!word)
        for (let i = 0; i < meanings.length - 1; i++) {
            if (meanings[i] == meanings[i + 1]) {
                meanings[k++] = meanings[i]
                i++
            }
        }
        meanings = meanings.slice(0, POSs.length)
        POSs.forEach((POS, i) => meanings[i] = `${POS} - ${meanings[i]}`)
        console.log(meanings.join('\n'))
        console.log(synonyms)
    })();
}

browse()