const db = require('../connection.js')

exports.selectTopics= ()=> {
    return db.query(`SELECT * FROM topics`)
    .then(({rows}) => {
        console.log(rows)
        return rows
    })
}

//exports.selectEndpoints = () => {

//}