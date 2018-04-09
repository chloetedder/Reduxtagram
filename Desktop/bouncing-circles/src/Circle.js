import React from 'react';

function random(min,max) {
    let num = Math.floor(Math.random()*(max-min)) + min;
    return num;
  }

export default class Circle {
    constructor(width,height){
        this.x = random(0,width);
        this.y = random(0,height);
        this.velX = random(-7,7);
        this.velY = random(-7,7);
        this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
        this.size = random(10,20);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
      }

      update(width,height) {
        if((this.x + this.size) >= width) {
          this.velX = -(this.velX);
        }
      
        if((this.x - this.size) <= 0) {
          this.velX = -(this.velX);
        }
      
        if((this.y + this.size) >= height) {
          this.velY = -(this.velY);
        }
      
        if((this.y - this.size) <= 0) {
          this.velY = -(this.velY);
        }
      
        this.x += this.velX;
        this.y += this.velY;
      }

      collisionDetect(circles) {
        for(let circle of circles) {
          if( (!(this.x === circle.x && this.y === circle.y && this.velX === circle.velX && this.velY === circle.velY)) ) {
            let dx = this.x - circle.x;
            let dy = this.y - circle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
      
            if (distance < this.size + circle.size) {
              circle.color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
            }
          }
        }
      }
}