const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const index = require('../index')

const url = `mongodb://mongo:27017`
const dbName = 'connect4'
const colName = 'games'

const connectionPromise = MongoClient.connect(url)

module.exports = {
    createGame,
    findGame,
    saveGameTurn,
    listAllGames,
}

function getCollection() {
    return connectionPromise
        .then(client => {
            const db = client.db(dbName)
            const col = db.collection(colName)
            return col
        })
}

function createGame() {
    // TODO adapter donner
    const doc = {
        turn: 0,
        history: [{
            board: index.createEmptyBoard(),
        }]
    }
    return getCollection()
        .then(col => {
            return col.insertOne(doc)
        })
        .then(opResult => {
            if (opResult.result.ok === 1) {
                return opResult.ops[0]
            } else {
                throw new Error('Failed to insert document')
            }
        })
}

function toObjectId(id) {
    if (typeof id === 'string') {
        return ObjectID(id)
    } else {
        return id
    }
}

function listAllGames() {
    return getCollection()
        .then(col => col.find())
        .then(cursor => cursor
            .sort({_id:-1})
            .project({turn:0})
            .toArray()
        )
}

function findGame(id) {
    return getCollection()
        .then(col => {
            return col.findOne({
                _id: toObjectId(id),
            })
        })
}

function getLastTurnBDD(id,possibleLastTurn) {
    return getCollection().then(
        res => {
            return res.findOne({
                _id: toObjectId(id),
                turn: possibleLastTurn,
            })
        }
    ).then(result => {
        // console.log(result.turn)
        if (result !== null){
            return result.turn;
        }else{
            return null
        }

    })

}

function saveGameTurn(id, turn, board) {
    // comparer turn a BDD last turn
    const possibleLastTurn = turn-1;
    return getLastTurnBDD(id,possibleLastTurn).then(
        lastTurn => {

            if (lastTurn === turn-1){
                return getCollection()
                    .then(col => {
                        const filter = {_id: toObjectId(id)}
                        // TODO adapter données
                        const update = {
                            $set: {turn: turn},
                            $push: {history: {board}},
                        }
                        return col.updateOne(filter, update).then(
                            () => {
                                return findGame(id);
                            }
                        )
                    })
            }else{
                throw new Error('Impossible, tour incorrect')
            }
        }
    )


}

// createGame()
//     .then(doc => {
//         const id = doc._id
//         return saveGameTurn(id, 1, [1, 2, 3])
//             .then(result => {
//                 console.log(result)
//                 // return findGame(String(id))
//             })
//     })
//     listaAllGames()
//     .then(result => {
//         console.log(result)
//     })
//     .catch(err => {
//         console.error(err.stack)
//         process.exit(1)
//     })

function testCreateGame() {
    createGame()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })
}
