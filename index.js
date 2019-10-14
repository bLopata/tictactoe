/* Requirements: 
* 3x3 game grid drawn with ASCII characters in console.
* Detect and validate user input for position to draw character based on turn (alternating 'X' and 'O')
* Look for winner (3-in-a-row) or stalemate.
*/
let game = function () {
    
    var turnCount = 1,
        gameOver = false
    
    let checkForGameOver = () => {
        return gameOver ? console.log('Game over! Start a new game.') : null
    }

    let isEqual = arr => {
        return arr.reduce((a, b) => {
            if (a === ' ') {
                return false
            }
            else {
                return a === b ? a : false
            }
        }) === arr[0]
    }

    let testInput = (pos, char) => {
        if (pos > 8) {
            console.log('Please input a number between 0 and 8')
            return
        } else if (placement[pos] !== ' ') {
            console.log('That spot is taken!')
            return
        } if (char === 'x' || char === 'X' || char === 'o' || char === 'O') {
            placement[pos] = char.toUpperCase()
        } else {
            console.log('Please enter a valid character (X or O)')
        }
    }

    let findWinner = () => {
        if (
            isEqual(Array.from({ length: 3 }, (x, i) => placement[i])) ||
            isEqual(Array.from({ length: 3 }, (x, i) => placement[i + 3])) ||
            isEqual(Array.from({ length: 3 }, (x, i) => placement[i + 6])) ||

            isEqual([placement[0], placement[3], placement[6]]) ||
            isEqual([placement[1], placement[4], placement[7]]) ||
            isEqual([placement[2], placement[5], placement[8]]) ||

            isEqual([placement[0], placement[4], placement[8]]) ||
            isEqual([placement[2], placement[4], placement[6]])
                
        ) {
            return true
        }
    }
    return {
        drawBoard: function (firstRun) {
            if (firstRun) {
                placement = [...new Array(9).keys()]
            }
            console.log('Welcome \n \n')
            let row1 = ' ' + placement.slice(0, 3).join(' | ') + '\n',
                row2 = placement.slice(3, 6).join(' | ') + '\n',
                row3 = placement.slice(6, 9).join(' | ') + '\n',
                structureRow = '--|---|--' + '\n'
                
            console.log(row1, structureRow, row2, structureRow, row3)
            if (firstRun) {
                placement.forEach(i => {placement[i] = ' '})
            }
        },

        place: function(pos, char) {
            if (gameOver) {
                checkForGameOver()
                return
            }
            testInput(pos, char)

            turnCount++

            if (findWinner()) {
                this.drawBoard()
                console.log(`Game over!`)
                gameOver = true
            } else if (turnCount > 9) {
                console.log('Draw!')
            } else {
                this.drawBoard()
            }
        },

        startNewGame: function () {
            placement.forEach(i => { placement[i] = ' ' })
            turnCount = 1
            gameOver = false
            this.drawBoard(true)
        }
    }
}

var t3 = game()

t3.drawBoard(true)