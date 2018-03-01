const express = require('express');
const app = express();
const compression = require('compression');
const morgan = require('morgan')

const myCompression = compression();
app.use(myCompression)

app.use(morgan('tiny'));

const {
    listAllGames,
} = require('./data')


app.listen(80, (err) =>{
    if (err){
        console.log(err && err.stack || err)
        process.exit(255)
    }else{
        console.log('done');
    }

})

app.use((req,res,next) => {
    next()
})

app.get('/game/:id', (req, res) =>{
    console.log(req.params)
})

function renderGames(games) {
    const list = games.map(games =>{
        return `
                <li>
                <a href="/game/${games._id}">${games._id}</a>
                </li>`
    }).join('')

    return `
        <html>
        <head>
            <title>Puissance 4</title>
        </head>
        <body>
            <h1>Bienvenue</h1>
            <section>
                <h2>Toutes les parties</h2>
                <ul>
                    ${list}
                </ul>
            </section>
        </body>
        `
}

app.get('/',(req,res) =>{
    //cons html = renderGames(games)
    listAllGames()
    .then(games => {
        console.log(games);
        const html = renderGames(games);
        res.send(html)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).send("oops c'est pas trop cool")
    })


})
