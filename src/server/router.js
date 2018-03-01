const express = require('express');


const {
    listAllGames,
    findGame,
} = require('./data')




// Configuration de la const en router
const router = express.Router();


module.exports = router




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
                <form action="/game" method="post">
                    <input type="text" name="player1">
                    <input type="text" name="player2">
                    <input type="submit" value="Nouvelle partie">
                </form>
                <h2>Toutes les parties</h2>
                <ul>
                    ${list}
                </ul>
            </section>
        </body>
        `
}

router.get('/',(req,res) =>{
    //cons html = renderGames(games)
    listAllGames()
        .then(games => {
            //console.log(games);
            const html = renderGames(games);
            res.send(html)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send("oops c'est pas trop cool")
        })


});

router.get('/game/:id', (req, res) =>{
    const id = req.params.id;
    findGame(id)
        .then( game => {
            if (game === null) {
                res.send('Partie inexistante')
            } else{
                res.send(
                    `
                    <html>
                        <head>
                            <title> Jeu n° ${game._id}</title>
                            <link rel="stylesheet" href="/static/game.css">
                            <script src="/static/game.js"></script>   
                        </head>
                        <body>
                            <a href="/">Retour</a>
                            <h1> Jeu n° ${game._id}</h1>
                            <div> Tour n°${game.turn}</div>
                            <div id="board"></div>
                        </body>
                    </html>
                    `
                )
            }
        })
        .catch(err => {
            console.error('Failed to display /game/...');
            res.status(500).send('Ola quetal sa bug');
        })
});


router.post('/game',(req,res) =>
    {
        const {player1,player2} = req.body;
        console.log(player1, player2)
        createGame({
            player1: player1,
            player2: player2,
        })
        .then(result =>{
            res.redirect(303, '/game/' + result._id);
        })
        .catch( err =>{
            console.error('Failed to create /game/...json', err.stack);
            console.status(500).send('page game fonctionne pas');
        })
    }
);

router.get('/game/:id.json', (req,res) =>{
    const id = req.params.id;
    findGame(id)
        .then( game => {
            if (game === null) {
                res.status(404);
            } else{
                res.send(
                    game
                )
            }
        })
        .catch(err => {
            console.error('Failed to display /game/...');
            res.status(500).send({error:'server error'});
        })
});


router.post('/ping', (req,res) => {
    const value = req.body ?  req.body.value: null ;
    console.log({
        response: value
    })
    res.send({
        response:value
    })
})