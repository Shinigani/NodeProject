const readline = require('readline')

const CELL_EMPTY = 0
const PLAYER_A = 'X'
const PLAYER_B = 'O'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

module.exports =
{
    createEmptyBoard,
}

const board = createEmptyBoard();
function createEmptyBoard() {
    const board = [
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
        [CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY, CELL_EMPTY],
    ]

    return board
}


//playGame()

function playGame() {
    const state = {
        board: createEmptyBoard(),
        turn: 0,
    }
    display(board);
    promptNextMove(state);


    function promptNextMove(state) {
        const player = getPlayerForState(state)
        const displayPlayer = getDisplayPlayer(player)
        const question = `${displayPlayer}, prochain coup ? `
        prompt(question, answer => {
            console.log('Saisie dans la colonne : ' + answer);
            verificationSaisie(answer);
            state.turn++;
            checkLine();
    })
    }
    
    function verificationSaisie(saisie) {
        var playernow =getPlayerForState(state);

        if ((saisie <= 7) && (saisie > 0 )){
            promptNextMove(state);
            insertTable(saisie);
            console.log(checkColumn(saisie,playernow))
            display(board);

        }else {
            rl.question('Numéro erroné, veuillez saisir à nouveau : ', answer => {
                verificationSaisie(answer);
            })
        }
    }

    function insertTable(number) {
        number = number-1;


        for(var i = board.length-1, lan =0 ; lan <= i ; i--)
        {
            if (board[i][number] === CELL_EMPTY)
            {

                var playernow =getPlayerForState(state);

                if(playernow === PLAYER_A){
                    board[i][number] = 'X';
                    break;
                }else{
                    board[i][number] = 'O';
                    break;
                }

            }else {
                if (i == 0){
                    console.log('\nColonne pleine');
                    state.turn--;

                    break;
                }

            }
        }

    }

    function getPlayerForState(state) {
        const turn = state.turn
        if (turn % 2 === 0) {
            return PLAYER_A
        } else {
            return PLAYER_B
        }
    }

    function getDisplayPlayer(player) {
        switch (player) {
            case PLAYER_A: return 'Joueur A'
            case PLAYER_B: return 'Joueur B'
            default: throw new Error('Invalid player: ' + player)
        }
    }
}

function prompt(question, callback) {
    rl.question(question, callback);
}

// display(board)

function display(board) {
    write('\n')
    board.forEach(row => {
        row.forEach(cell => {
            write(String('|'+cell ))
        })
    write("|")
    write(String("\n"))
    })
}
/*
* Loop pour validation de la ligne*/
function checkLine() {

}

/*
* Loop pour validation de la colonne
* */
function checkColumn(number,player) {
    let currentValue = null;
    let previousValue = 0;
    let gagnant = 0;

    // Vérifie chacune des lignes
    for (var y = 0; y <= 5; y++) {
        for (var x = 0; x <= 6; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                gagnant += 1;
            } else {
                // Reset the tally if you find a gap.
                gagnant = 0;
            }
            if (gagnant === config.countToWin - 1) {
                return true;
            }
            previousValue = currentValue;
        }

        // reset apres chaque ligne les valeurs de verif
        gagnant = 0;
        previousValue = 0;
    }

    // No horizontal win was found.
    return false;
}




function write(msg) {
    process.stdout.write(msg)
}


