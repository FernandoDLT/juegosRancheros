// Make sure: all HTML file are loaded before reading JS Code
document.addEventListener('DOMContentLoaded', () =>{

  const grid = document.querySelector('.grid')
  let width = 10
  let flagsLeft = document.querySelector('span')
  // empty array of squares
  let squares = []
  let beesAmount = 20
  let honey = 0;
  let isGameOver = false;
  

  // Create Board
  function createBoard(){
    // Place bees over the grid
    // get shuffled game array with No. of random bees.
    const beesArray = Array(beesAmount).fill('bee')
    // fill other with 'valid'
    const emptyArray = Array(width*width - beesAmount).fill('valid')
    // make one shuffled Array out of beesArray and emptyArray
    const  gameArray = emptyArray.concat(beesArray)
    // Shuffled Array of 'bee' and 'valid'
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    // Create 100 Square
    for (let i=0; i < width*width; i++ ){
      //creates a hundred div's
      const square = document.createElement('div')
      // assign unique ID
      square.setAttribute('id', i)
      // add content 'bee'or 'valid' to array as classes
      square.classList.add(shuffledArray[i])
      // add square to grid by appending to grid
      grid.appendChild(square)
      //add element to the squares array
      squares.push(square)
      
      // add Event Listener, normal 'click'
      square.addEventListener('click', function(e) {
        click(square)
      })

      // add Event Listener, right 'click' (control and left click)
      square.oncontextmenu = function(e){
        e.preventDefault()
        addHoney(square)
      }
      flagsLeft.innerHTML = (beesAmount - honey)
    }

    
    // add number of bees in bordering cell
    for ( let i = 0; i < squares.length; i++) {
      let total = 0
      const isLeftEdge = (i % width === 0)
      const isRightEdge = (i % width === width-1)

      if (squares[i].classList.contains('valid')) {
        // left
        if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bee')) total++
        // top-left
        if (i > 10 && !isLeftEdge && squares[i-1-width].classList.contains('bee')) total++
        // top-middle
        if (i > 9 && squares[i-width].classList.contains('bee')) total++
        // top-right
        if (i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bee')) total++
        // right
        if (i < 98 && !isRightEdge && squares[i+1].classList.contains('bee')) total++
        // bottom-right
        if (i < 89 && !isRightEdge && squares[i+1+width].classList.contains('bee')) total++
        // bottom-middle
        if (i < 90 && squares[i+width].classList.contains('bee')) total++
        // bottom-left
        if (i < 90 && !isLeftEdge && squares[i-1+width].classList.contains('bee')) total++
        squares[i].setAttribute('data', total)
      }
    }
  }

  // call function createBoard
  createBoard()

  
  // add honeypot with right click
  function addHoney(square){
    if (isGameOver) return
    if (!square.classList.contains('checked') && (honey < beesAmount)){
      if (!square.classList.contains('honey')){
        square.classList.add('honey')
        square.innerHTML = '🍯'
        honey++
        document.querySelector('span').innerText = (beesAmount - honey)
        checkForWin()
      } else {
        square.classList.remove('honey')
        square.innerHTML = ''
        honey--
      }
    } 
  }


  // click on square actions
  function click(square) {
    let currentId = square.id
    //check if game has not ended    
    if (isGameOver) return
    // if cell is checked (clicked) or has honey return
    if (square.classList.contains('checked') || square.classList.contains('honey')) return
    // if cell contains 'bee'  
    if (square.classList.contains('bee')) {
      // run function gameOver
      gameOver(square)
      // 
    } else {
      let total = square.getAttribute('data')
      // total not null, mark square 'checked' and insert total (innerHTML)
      if (total != 0) {
        square.classList.add('checked')
        square.innerHTML = total
        return
      } 
      // total is "0" do the run checkSquare   
      checkSquare(square, currentId)
    }
    square.classList.add('checked')
  }

  //check neighboring squares once a square is clicked and empty
  function checkSquare(square, currentId) {
    // Define isLeftEdge and isRightEdge
    const isLeftEdge = (currentId % width === 0)
    const isRightEdge = (currentId % width === width-1)
    setTimeout(() => {
      // check square to left
      if (currentId > 0  && !isLeftEdge){
        const newId = squares[parseInt(currentId) -1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // top-left
      if (currentId > 10 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) -1-width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // top-middle
      if (currentId > 9) {
        const newId = squares[parseInt(currentId) -width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      } 
      // top-right
      if (currentId > 9 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1-width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // right
      if (currentId < 99 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // bottom-right
      if (currentId < 89 && !isRightEdge){
        const newId = squares[parseInt(currentId) +1+width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // bottom-middle
      if (currentId < 90){
        const newId = squares[parseInt(currentId) +width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
      // bottom-left
      if (currentId < 90 && !isLeftEdge){
        const newId = squares[parseInt(currentId) -1+width].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
      }
    }, 10)
  }

  //Function gameOver()
  function gameOver(square){
  document.getElementById('status').innerHTML = "OWWWwww! Game Over "
  isGameOver = true
  // show all the 'bees'
  squares.forEach(square => {
    if (square.classList.contains('bee') && !square.classList.contains('honey')){
      square.innerHTML = '🐝'
    }
  })
  }

  // check for win
  function checkForWin (){
    let matches = 0
    for ( let i=0; i<squares.length; i++){
      if (squares[i].classList.contains('honey') && squares[i].classList.contains('bee')){
        matches++
      }
      if (matches === beesAmount){ 
        document.getElementById('status').innerHTML = ('YOU WIN')
        isGameOver = true
      } else {

      }

    }
  }

  // Reset when clicked;
  document.querySelector('button').addEventListener('click', () =>{
    let honey = 0;
    let isGameOver = false;
    document.querySelector('.grid').innerHTML = ''
    document.getElementById('status').innerHTML = ""
    createBoard()
  })

})