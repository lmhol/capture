var pos = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  key:[]
}

function Draw(){
  let map = new Map();
  let player = new Player(map.ctx, map.cw, map.ch);
      
  requestAnimationFrame(Draw);
  map.update();
  map.draw();
  player.draw();
}

function Map(){
  this.ctx = document.getElementById('c').getContext("2d");
  this.cw = this.ctx.canvas.width  = window.innerWidth;
  this.ch = this.ctx.canvas.height = window.innerHeight;
  this.bg = new Image();
  this.bg.src = "v4.png";
  this.speed = 10;
  this.friction = .8;
  
  this.update = function(){

  }
  
  this.draw = function(){
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.ctx.drawImage(this.bg, pos.x, pos.y, this.cw, this.ch, 0, 0, this.cw, this.ch);
  };
}

function Player(ctx, cw, ch){
  this.x = cw/2;
  this.y = ch/2;
  this.radius = 10;
  this.sAngle = 0;
  this.eAngle = Math.PI * 2;
  this.color = "black";
  
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
    ctx.fill();
  };
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('load', function(event){
  Draw();
});