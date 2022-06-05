//global variables
let pos1 = document.querySelector('#one')
let pos2 = document.querySelector('#two')
let pos3 = document.querySelector('#three')
let pos4 = document.querySelector('#four')
let pos5 = document.querySelector('#five')
let pos6 = document.querySelector('#six')
let pos7 = document.querySelector('#seven')
let pos8 = document.querySelector('#eight')
let pos9 = document.querySelector('#nine')
let anyPos = document.querySelectorAll('.block')
let winner = document.querySelector('.winnerText')
let singlePlayer = document.querySelector('#single')
let multiPlayer = document.querySelector('#multi')
let xTurn = true;
let numberOfPlayers = 1
let winCases = {
    win123:[pos1, pos2, pos3],
    win456:[pos4, pos5, pos6],
    win789:[pos7, pos8, pos9],
    win147:[pos1, pos4, pos7],
    win258:[pos2, pos5, pos8],
    win369:[pos3, pos6, pos9],
    win159:[pos1, pos5, pos9],
    win357:[pos3, pos5, pos7]
  }
//add event listeners 
anyPos.forEach((block)=>{
  block.addEventListener('click', markPos)
});
singlePlayer.addEventListener('click', singlePlayerGame)
multiPlayer.addEventListener('click', multiPlayerGame)
document.querySelectorAll('.reset').forEach(button => {
  button.addEventListener('click', reset)
})

//activate single player game
function singlePlayerGame() {
  singlePlayer.classList.add('active');
  multiPlayer.classList.remove('active');
  numberOfPlayers = 1 
  xTurn = true
  reset()
  console.log(numberOfPlayers)
}
//activate multi player game
function multiPlayerGame() {
  multiPlayer.classList.add('active');
  singlePlayer.classList.remove('active');
  numberOfPlayers = 2
  reset()
  console.log(numberOfPlayers)
}
//AI block function
function blockWin(mark){
  for (let key in winCases){
    for (let i =0; i < winCases[key].length; i++){
      if(winCases[key][i].innerText) continue;
      let blockVal = winCases[key][i].innerText
      winCases[key][i].innerText = mark
      let isWin = winCases[key].every(pos => pos.innerText === mark)
      winCases[key][i].innerText = blockVal
      if(isWin){
        return winCases[key][i]
      }
    }
  }
}
console.log(blockWin('X'))

function blockWin(mark){
  for (let key in winCases){
    for (let i =0; i < winCases[key].length; i++){
      if(winCases[key][i].innerText) continue;
      let blockVal = winCases[key][i].innerText
      winCases[key][i].innerText = mark
      let isWin = winCases[key].every(pos => pos.innerText === mark)
      winCases[key][i].innerText = blockVal
      if(isWin){
        return winCases[key][i]
      }
    }
  }
}
console.log(blockWin('X'))

//place markers
function markPos(){
  if (numberOfPlayers == 2 && winner.innerText == ''){
      if (xTurn && this.innerText === '') {
        this.innerText = 'X'
        winCheck()
        xTurn = false
      } else if (!xTurn && this.innerText === '') {
          this.innerText = 'O'
          winCheck()
          xTurn = true
    }
  } else if( numberOfPlayers == 1 && winner.innerText == ''){
       if (xTurn && this.innerText === '') {
         this.innerText = 'X'
         xTurn = false
        winCheck()
         if (winner.innerText == ''){ 
           setTimeout(() => {
            let blockTestX = blockWin('X')
            let blockTestO = blockWin('O')
            if (blockTestO){
              blockTestO.innerText = 'O'
            } else if (blockTestX){
              blockTestX.innerText = 'O'
              } else if (!pos5.innerText){
                 pos5.innerText = 'O'
                } else {
                    let emptyPos =  [...anyPos].filter(pos => pos.innerText === '')
                    let index = Math.floor(Math.random() * emptyPos.length)
                    emptyPos[index].innerText = 'O'
            }
            winCheck() 
            xTurn = true
          }, Math.random() * 1500) 
          
         }
      } 
  }
}


//check for winner
function winCheck() {
  let winningPlayer = ''
  let allPos = [
    pos1.innerText,
    pos2.innerText, 
    pos3.innerText, 
    pos4.innerText, 
    pos5.innerText, 
    pos6.innerText, 
    pos7.innerText, 
    pos8.innerText, 
    pos9.innerText
  ]
  let noWinner =  allPos.map(block => block != '' ? block = 1 :  block = 0).reduce((acc, num) => acc + num, 0)
  let strike = ''
  
  for (let key in winCases){
    let isWin = winCases[key].every(pos => pos.innerText && pos.innerText === winCases[key][0].innerText)
    if (isWin){
      strike = key
      document.querySelector('.'+strike).style.visibility = 'visible'
      winningPlayer = winCases[key][0].innerText
      break
    }
  }
  if (winningPlayer != '') { 
    winner.innerText = `${winningPlayer} Wins!!`
    document.querySelector('.popup').classList.remove('invisible')
  }else if (noWinner == 9){
    winner.innerText = 'Draw!'
    document.querySelector('.popup').classList.remove('invisible')
  }
}

//reset resets board on click
function reset() {
  document.querySelectorAll('.block').forEach((block)=>{
    block.innerText = ""
  })
  winner.innerText = ""
  xTurn = true
  document.querySelectorAll('.strike').forEach((line)=>{
    line.style.visibility = 'hidden'
  })
  document.querySelector('.popup').classList.add('invisible')
}



// color picker
let colors = ['blue', 'pink']
colors.forEach((color)=>{
  let element = document.getElementById(color)
  element.addEventListener('click', () => {makeColor(element)})
})

function makeColor(e){
  let color = e.getAttribute('id')
  document.querySelector('body').classList.remove('blue', 'pink')//add loop on colors to remove IDs 
  document.querySelector('body').classList.add(color)
}

//shape picker
// document.querySelector('.shape').addEventListener('click', () => {
//   document.querySelector('.shape').classList.contains('curved') ? curveEdges() : squareEdges()})

// function curveEdges(){
//   document.querySelectorAll('.block').forEach(block => {
//     block.classList.add('curvedEdge')
//   })
//   document.querySelector('.board').classList.add('curvedEdge')
//   document.querySelector('.shape').classList.remove('curved')
  
// }
// //change board shape
// function squareEdges(){
//   document.querySelectorAll('.block').forEach(block => {
//     block.classList.remove('curvedEdge')
//   })
//   document.querySelector('.board').classList.remove('curvedEdge')
//   document.querySelector('.shape').classList.add('curved')
// }

// Reset game at site load
reset()