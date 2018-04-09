import React, { Component } from 'react';
import './App.css';
import './style.css';
import Circle from './Circle';

class App extends Component {
  constructor(){
    super();
    this.state = {
      circles: []
    };
    this.loop = this.loop.bind(this);
  }

  componentDidMount(){
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    requestAnimationFrame(this.loop(width,height,ctx));

  }



  loop(width,height,ctx) {

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);
  
    while(this.state.circles.length < 25) {
      let circle = new Circle(width,height);
      //circles.push(circle);
      this.setState({
        circles: [...this.state.circles,circle]
      })
    }
  
    for(let circle of this.state.circles) {
      circle.draw(ctx);
      circle.update(width,height);
      circle.collisionDetect(this.state.circles);
    }
   
    requestAnimationFrame(this.loop(width,height,ctx));
  }

  render() {
    return (
      <div className="App">
        <h1>bouncing circles</h1>
        <canvas></canvas>
      </div>
    );
  }
}

export default App;
