const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const chooseSideElement = document.getElementById('chooseSide')
var turnIndicator = document.querySelector('[data-turn]')
var Xscore = 0
var Oscore = 0
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function chooseYourSide(){
    chooseSideElement.classList.add('show')
    var playerX = document.getElementById('player-x')
    var playerO = document.getElementById('player-o')
    playerX.addEventListener('click',()=>{{
      circleTurn = 'X'
      console.log(circleTurn)
      startGame()
      chooseSideElement.classList.remove('show')
    }})
    playerO.addEventListener('click',()=>{
      circleTurn = 'O'
      console.log(circleTurn)
      startGame()
      chooseSideElement.classList.remove('show')
    })
}

function startGame() {
  chooseYourSide()
  displayScore()
  showTurn()
  if(circleTurn == 'X'){
    circleTurn = false
  }else{
    circleTurn = true
  }
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
    turnIndicator.textContent = ""
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    circleTurn ? Oscore += 1 : Xscore += 1
    console.log(`Xscore: ${Xscore} \n O Score: ${Oscore}`)
    turnIndicator.textContent = ""
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
  console.log(`cell: ${cell.innerText} current Class: ${currentClass}`)
  showTurn()
}
function showTurn(){
  if(circleTurn == true){
    turnIndicator.textContent = `X's turn`
  }else if(circleTurn == false){
    turnIndicator.textContent = `O's turn`
  }else if(circleTurn == undefined){
    turnIndicator.textContent = ""
  }else{
    turnIndicator.textContent = `${circleTurn}'s turn`
  }
}
function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function displayScore(){
  document.querySelector('[data-x-score]').textContent = Xscore
  document.querySelector('[data-o-score]').textContent = Oscore
}