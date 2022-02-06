import React, {Component} from 'react';
import snakeHead from './snake-head.png';
import food from './apple.png';
import CbRowCol from './components/cb_row/cbrowcol.js';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    let foodPoX = Math.floor(Math.random()*20)*20;
    let foodPoY = Math.floor(Math.random()*20)*20;
    this.state = {
      snakeHeadPos: {snakePosX:0, snakePosY:0},
      snakeBodyPos: [],
      newSnakeBody: [],
      direction:'right', 
      foodPos: {foodPoX:foodPoX, foodPoY:foodPoY},
      score: 0,
      isGameOver: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    if (this.state.isGameOver){
      return (       
        <div className="App">
          <div className="snake-container">
            <div className='headline'>
                <h1>Snake Game</h1>
                <p>Move with keyboard arrow keys "Up", "Down", "Left", "Right"</p>
            </div>
            <div className="chess-board">
              <CbRowCol />
              <h2 className='gameover'>Game Over!</h2>
              <button className='startBtn'>
                <h2>Press Space to restart</h2>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <div className="snake-container">
          <div className='headline'>
              <h1>Snake Game</h1>
              <p>Move with keyboard arrow keys "Up", "Down", "Left", "Right"</p>
          </div>
          <div className='is-flex'>
            <h2>Score:</h2>
            <span className='score'>
              {this.state.score}
            </span>
          </div>
          <div className="chess-board">
            <CbRowCol />
            <div className='cb-snake'>
                  <div className='snake-body snake-head'
                      style={{'left': ( this.state.snakeHeadPos.snakePosX + 'px'),
                              'top': (this.state.snakeHeadPos.snakePosY + 'px')
                              }}>
                      <img src={snakeHead} className='snake-head-img' />;
                  </div>
                  <div className='snake-body body1'></div>
                  <div className='snake-body body2'></div>
                  {this.state.newSnakeBody.map((item, index) => {
                  return (
                      <div className='snake-body'
                          style={{'left': ( item.newSnakeBodyPosX+ 'px'),
                                  'top': (item.newSnakeBodyPosY + 'px')
                              }}>
                      </div>
                  )
                  })}
              </div>
              <div className='cb-food'
                  style={{'left': ( this.state.foodPos.foodPoX + 'px'),
                          'top': (this.state.foodPos.foodPoY + 'px')
                          }}>
                  <img src={food} className='apple-img' />
              </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDown);
    this.autoMove();
  }
  
  resetGame(){
    let allSnakeBody = document.getElementsByClassName('snake-body');  

    for (let i = 1; i < allSnakeBody.length; i++) {
        allSnakeBody[i].style.left = (-20)*i + 'px';
        allSnakeBody[i].style.top =  0 + 'px';
    }
    
    let foodPoX = Math.floor(Math.random()*20)*20;
    let foodPoY = Math.floor(Math.random()*20)*20;
    this.setState ({
      snakeHeadPos: {snakePosX:0, snakePosY:0},
      snakeBodyPos: [],
      newSnakeBody: [],
      direction:'right', 
      foodPos: {foodPoX:foodPoX, foodPoY:foodPoY},
      score: 0,
      isGameOver: false,
    });
  }

  handleKeyDown(event){  

    if (this.state.isGameOver && event.keyCode === 32 ) {
      this.resetGame();
      this.autoMove();
      return
    }

      var newKeyDirection = this.state.direction;

      if(newKeyDirection === 'right' || newKeyDirection === 'left' ){

          if (event.keyCode === 40) {
              newKeyDirection = 'bottom';

          } else if (event.keyCode === 38) {
              newKeyDirection = 'top';
          }

      } else {

          if(event.keyCode === 39) {
              newKeyDirection = 'right';
          } else if (event.keyCode === 37) {
              newKeyDirection = 'left';
          } 

      } 

      this.setState ({
        direction: newKeyDirection, 
      })

  }

  autoMove(){    
    if (!this.state.isGameOver) {
      this.timerID = setTimeout(() => {
        this.snakeHeadMove();
        this.autoMove();
      }, 150);
    }
  }


  snakeHeadMove(){

      let newDirection = this.state.direction;
      let newSnakeHeadPosX = this.state.snakeHeadPos.snakePosX;
      let newSnakeHeadPosY = this.state.snakeHeadPos.snakePosY;
      var snakeHead = document.querySelector('.snake-head');

      if(newDirection === 'right') {
        if (newSnakeHeadPosX < 380) {
          newSnakeHeadPosX += 20;
        } else if (newSnakeHeadPosX === 380) {
          newSnakeHeadPosX = 0;
        }
        snakeHead.style.transform = 'rotate(0deg)';
        this.bodyMove();

      } else if (newDirection === 'bottom') {
        if (newSnakeHeadPosY < 380) {
          newSnakeHeadPosY += 20;
        } else if (newSnakeHeadPosY === 380) {
          newSnakeHeadPosY = 0;
        }
        snakeHead.style.transform = 'rotate(90deg)';
        this.bodyMove();

      } else if (newDirection === 'left') {
        if (newSnakeHeadPosX > 0) {
          newSnakeHeadPosX -= 20;
        } else if (newSnakeHeadPosX === 0) {
          newSnakeHeadPosX = 380;
        }
        snakeHead.style.transform = 'rotate(0deg)  scaleX(-1)';
        this.bodyMove();

      } else if (newDirection === 'top') {
        if (newSnakeHeadPosY > 0) {
          newSnakeHeadPosY -= 20;
        } else if (newSnakeHeadPosY === 0) {
          newSnakeHeadPosY = 380;
        }
        snakeHead.style.transform = 'rotate(270deg)';
        this.bodyMove();

      } 

      this.setState ({
        snakeHeadPos: {snakePosX:newSnakeHeadPosX, snakePosY:newSnakeHeadPosY},
        direction: newDirection, 
      })

      this.eatFood();

      this.gameOver();

      
  }

  bodyMove(){
      let allSnakeBody = document.getElementsByClassName('snake-body');  
      let snakeBodyPos = [];
      for(let i=0;i<allSnakeBody.length;i++){
        let snakeBodyL = parseInt(document.getElementsByClassName('snake-body')[i].offsetLeft);
        let snakeBodyT = parseInt(document.getElementsByClassName('snake-body')[i].offsetTop);
        let snakeBody = {snakeBodyL: snakeBodyL, snakeBodyT: snakeBodyT};
        snakeBodyPos.push(snakeBody);
      }

      for (let i = 1; i < allSnakeBody.length; i++) {
          allSnakeBody[i].style.left = snakeBodyPos[i-1].snakeBodyL + 'px';
          allSnakeBody[i].style.top =  snakeBodyPos[i-1].snakeBodyT + 'px';
      }

      this.setState ({
        snakeBodyPos: snakeBodyPos, 
      })


  }

  //when snake eat food
  eatFood(){
    // food
    let foodPoX = this.state.foodPos.foodPoX;
    let foodPoY = this.state.foodPos.foodPoY;
    //snake head position
    let snakePosX = this.state.snakeHeadPos.snakePosX;
    let snakePosY = this.state.snakeHeadPos.snakePosY;
    // last Snake body position
    let oldSnakeBodyLength = this.state.snakeBodyPos.length -1;
    let lastOldSnakeBodyPosX = this.state.snakeBodyPos[oldSnakeBodyLength].snakeBodyL;
    let lastOldSnakeBodyPosY = this.state.snakeBodyPos[oldSnakeBodyLength].snakeBodyT;
    if (foodPoX === snakePosX && foodPoY === snakePosY ) {
      // new snake body
      let newSnakeBodyXY = this.state.newSnakeBody;
      let newSnakeBodyPosX = lastOldSnakeBodyPosX;
      let newSnakeBodyPosY = lastOldSnakeBodyPosY;
      let newSnakeBodyPart = {newSnakeBodyPosX: newSnakeBodyPosX,newSnakeBodyPosY: newSnakeBodyPosY };
      newSnakeBodyXY.push(newSnakeBodyPart);

      // food reset
      let newFoodPoX = Math.floor(Math.random()*20)*20;
      let newFoodPoY = Math.floor(Math.random()*20)*20;
      let newScore = this.state.score + 1;

      this.setState({
        newSnakeBody: newSnakeBodyXY,
        foodPos: {foodPoX:newFoodPoX, foodPoY:newFoodPoY},
        score:newScore,
      });
    };


  }

  // when snake eat itself
  gameOver(){
    // snake body position
    let snakeBodyPos = this.state.snakeBodyPos;

    for (let i = 1; i < snakeBodyPos.length; i++) {

      if (this.state.snakeHeadPos.snakePosX === snakeBodyPos[i].snakeBodyL && this.state.snakeHeadPos.snakePosY === snakeBodyPos[i].snakeBodyT ) {
        let isGameOver = true;
        this.setState({
          isGameOver:isGameOver,
        });
      }
    }
    
  }
        
  componentWillUnmount() {
    clearTimeout(this.timerID);
    window.removeEventListener('keydown', this.handleKeyDown);
  }


}

export default App;
