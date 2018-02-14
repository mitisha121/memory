import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

//Attribution : https://reactjs.org/tutorial/tutorial.html
//Attribution : https://github.com/NatTuck/memory (Starter Code)

export default function run_demo(root, channel) {
  ReactDOM.render(<Game channel={channel}/>, root);
}

function Square(props) {
    return (
      <button className="square" onClick={props.onClick} >
        {props.value}
      </button>
    );

}

function SquareVal(props){
  
  return (
    <button className="square-vals" onClick={props.onClick} >
      {props.value}
    </button>
  );
  

}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;

    this.channel.join().receive("ok", this.got_view.bind(this)).receive("error", resp => { console.log("Unable to join", resp); });
    
    this.state = {
      vals: [],
      squares: [],
      match: "Matched",
      click: 0,
      flag: false,
      m: "",
      n: "",
    };
  }

  got_view(msg) {
    console.log("got view", msg);
    this.setState(msg.view);
    var flag = msg.view.flag;
    //var squares = msg.view.squares;
   // var i = msg.view.m;
   // var j = msg.view.n;
    
    setTimeout(()=>{
      if(!flag){
        this.timeout()}
      /*  
      if (flag && i!=j){
        squares[i] = null;
        squares[j] = null;
        this.setState({
          vals: msg.view.vals,
          squares: squares,
          match: msg.view.match,
          click: msg.view.click,
          flag: false,
          m: -1,
          n: -1,
        });} */
    },500);
  }
  
  handleClick(i){
    this.channel.push("after_click",{i:i})
    .receive("ok", this.got_view.bind(this));

    
    /*
    const squares = this.state.squares.slice();
    var click = this.state.click;
    click = click + 1;
    var flag = false;
  
    if(squares[i]== null){
      squares[i] = this.state.vals[i];
     // flag = true;
      this.setState({
        vals: this.state.vals,
        squares: squares,
        match: this.state.match,
        click: click,
      });
      
      var j = 0;
      var count = 0;
      for(j = 0; j<16; j++){
        if(squares[j] != null && squares[j]!=this.state.match && i!=j){
          break;
        }
      }
      if(j<16 && squares[j] == squares[i]){
        squares[i] = this.state.match;
        squares[j] = this.state.match;
      }
      if(j<16 && squares[j] != squares[i]){
        flag = true;
        this.setState({
          vals: this.state.vals,
          squares: squares,
          match: this.state.match,
          click: click,
        });

        
      }
      
      
      /*this.setState({
        vals: this.state.vals,
        squares: squares,
        match: this.state.match,
        click: click,
      }); 
    }*/
      
  } 
  newView(msg){
    this.setState(msg.view);
  }
  timeout(){
    this.channel.push("timeout",{})
    .receive("ok", this.newView.bind(this));
  }
    
  

  resetGame(){
    /*const squares = this.state.squares;
    for(var i = 0; i<16 ; i++){
      this.state.squares[i]=null;
    }
    const clicks = 0;
    this.setState({
      vals:this.state.vals,
      squares: squares,
      match: this.state.match,
      click: clicks,
    }); */
    this.channel.push("restart",{})
    .receive("ok", this.newView.bind(this));
  }

  renderSquare(i) {
    if (this.state.squares[i] == null){
    return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
    }
    else {
    return (<SquareVal value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
    }
  }

  render() {

    return (
      <div className="board-game">
       
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
        <div>
          <p> Number of click so far: {this.state.click} </p>
        </div>
        <div>
          <button className="restart" onClick={() => this.resetGame()}> Restart </button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.channel = props.channel;
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board channel={this.channel}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}



