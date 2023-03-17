const fs = require("fs")
let t = require('./t.json')
let lastRunIndex = t.map(t => t.status).lastIndexOf("running")
if (lastRunIndex == -1) lastRunIndex = t.map(t => t.status).indexOf("in-queue")
if (lastRunIndex == -1) {
    t.forEach(t => {
        t.status = "in-queue"
    })
    fs.writeFileSync("./t.json", JSON.stringify(t))
    lastRunIndex = 0
}

const changeStatus = (tr, i, s) => {
    tr[i]["status"] = s
    fs.writeFileSync("./t.json", JSON.stringify(tr))
    if (s == 'finished') {
        run(++i)
    }
}

const asyncFunc = (a) => {
    return new Promise((resolve, reject) => {
        let rand = Math.round(Math.random() * 1000) + 1000
        setTimeout(() => {
            console.log({ a, timeToExec: rand })
            return resolve()
        }, rand)
    })
}

const run = async (i) => {
    if (!t[i]) return
    changeStatus(t, i, "running")
    asyncFunc(t[i].a)
    changeStatus(t, i, "finished")
}

run(lastRunIndex)