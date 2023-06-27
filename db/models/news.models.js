const db = require('../connection.js')
const fs = require('fs/promises')

exports.selectTopics= ()=> {
    return db.query(`SELECT * FROM topics`)
    .then(({rows}) => {
        return rows
    })
}

exports.fetchEndpoints = () => {
    return fs.readFile('endpoints.json', 'utf8')
    .then((endpoints) => {
        return JSON.parse(endpoints)
        
    })

}