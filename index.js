const inquirer = require('inquirer');
const color = require('colors-cli');

const grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
const columns = ['a','b','c'];
const gridLength = grid.length;
let user,
     machine,
     turns = 0,
     next = 1,
     last = gridLength - 1,
     win = false;

// utilities
const getRandomNumber= () => {
  let min = Math.ceil(0);
  let max = Math.ceil(3);
  return Math.floor(Math.random() * (3 - 0) ) + 0;
}
const checkForX = (elem) => elem === 'X';
const checkForO = (elem) => elem === 'O';
const gridLine = color.red('  +---+---+---+');
const displayGrid = () => {
  const emptyGrid = grid.map(arr => arr.map(elem => elem === '' ? ' ' : elem));
  console.log('  | A | B | C |');
  console.log(gridLine);
  console.log('1 | ' + emptyGrid[0].join(' | ') + ' |');
  console.log(gridLine);
  console.log('2 | ' + emptyGrid[1].join(' | ') + ' |');
  console.log(gridLine);
  console.log('3 | ' + emptyGrid[2].join(' | ') + ' |');
  console.log(gridLine);
  console.log('\n');
}










// ------- start game
const startGame = () => {
  process.stdout.write('\033c');
  inquirer.prompt({
    type: 'list',
    name: 'player',
    message: 'Please select X or O:',
    choices: ['X', 'O']
  })
    .then( (answers) => {
      user = answers.player;
      machine = (user === 'X') ? 'O' : 'X';
      
      if (turns < 9 && win === false) {
        machineMakesASelection();
        checkForWin();
      } else {
        checkForWin();
      }
    })
    .catch((err) => console.log(`.catch caught an error :( \n ${err}`));
    
}


// ------- machine
const machineMakesASelection = () => {
  const row = getRandomNumber();
  const column = getRandomNumber();

  if (selectionIsValid(grid[row][column]) && win === false) {
    applyMachineSelection(row, column);
    turns++;
    displayGrid();
    checkForWin();
    userMakesASelection();
  } else {
    machineMakesASelection();
  }
}

const selectionIsValid = (selection) => {
  return selection === '' ? true : false;
}


const applyMachineSelection = (row, column) => {
  grid[row].splice(column, 1, machine);
}

// ------- end machine











// ---------- user 
const selectionPrompt = {
  type: 'input',
  name: 'play',
  message: 'Please select your move'
}
const userMakesASelection = () => {
  if (turns < 9 && win === false) {
    inquirer.prompt(selectionPrompt).then( answers => {
      validateUserInput(answers.play);
      checkForWin();
    })
    .catch((err) => console.log(`.catch caught an error :( \n ${err}`));
  } else {
    checkForWin();
  }
}

const validateUserInput = (input) => {
  if (input.length == 2) {
    const column = input.charAt(0).toLowerCase();
    const row = parseInt(input.charAt(1)) - 1;
        
    if (columnIsValid(column) && rowIsValid(row)) {
      applyUserSelection(column, row);
    } else {
      console.log('Please enter a valid move (e.g. [A-B] + [1-3])');
      userMakesASelection();
    }
  }
}

const applyUserSelection = (column, row) => {
  const columnNumber = columns.indexOf(column);
  if (grid[row][columnNumber] === '') {
    grid[row].splice(columnNumber, 1, user);
    turns++;
    displayGrid();
    checkForWin();
    machineMakesASelection();  
} else {
    console.log('That space is taken. Please try again.')
    userMakesASelection();
  }
}


const columnIsValid = (column) => {
  return columns.indexOf(column) === -1 ? false : true;
}

const rowIsValid = (row) => {
  if (row === NaN) {
    return false;
  }
  return (row >= 0 && row <= 2) ? true : false;
}
// ---------- end user







const endGame = () => {
  process.exit();
  return;
}





const checkForWin = () => {
  if (turns > 3 && win === false) {
    for ( let i = 0; i < gridLength; i++ ) {
      // vertical
      if (grid[0][i] === 'X' && grid[1][i] === 'X' && grid[2][i] === 'X' ) {
        gameOver('X');
      }
      if (grid[0][i] === 'O' && grid[1][i] === 'O' && grid[2][i] === 'O' ) {
        gameOver('O');
      }


      // check for horizontal win
      if (grid[i].every(checkForX)) {
        gameOver('X');
      }
      
      if (grid[i].every(checkForO)) {
        gameOver('O');
      }

      // check for diagonal (l to r)
      if (grid[i][i] === grid[next][next]) {
        let third = next+1;
        if (grid[next][next] === grid[third][third]) {
          gameOver(grid[next][next]);          
        }
      }
      // check for diagonal win (r to l)
      if (grid[i][last] === grid[next][next]) {
        let third = next-1;
        if (grid[next][next] === grid[last][third]) {
          gameOver(grid[next][next]);
        }
      }


    }
  }
  if (turns === 9 && win === false) {
    gameOver('draw');
  }
}

function gameOver(winner) {
  win = true;
  if (winner === 'O') {
    console.log('\n O wins!');
    endGame();
  } else if (winner === 'X') {
    console.log('\n X wins!');
    endGame();
  } else if (winner === 'draw') {
    console.log('\nGood game!'); 
    endGame();
  }
}


startGame();
