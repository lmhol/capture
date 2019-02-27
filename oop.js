var pos = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  key:[],
  b: []
}

function draw(){
  let map = new Map();
  let player = new Thing(map.ctx, map.cw, map.ch);
  let bullet = new Thing(map.ctx)
      
  requestAnimationFrame(draw);
  map.update();
  map.draw();
  player.draw();
  bullet.shoot();
}

function Map(){
  this.ctx = document.getElementById('c').getContext("2d");
  this.cw = this.ctx.canvas.width  = window.innerWidth;
  this.ch = this.ctx.canvas.height = window.innerHeight;
  this.bg = new Image();
  this.bg.src = "v4.png";
  this.speed = 10;
  this.friction = .8;
  
  this.update = function(e){
    if(pos.key[87] || pos.key[38]){
      if(pos.vy > -this.speed) {
        pos.vy--;
      }
    }
    if(pos.key[83] || pos.key[40]){
      if(pos.vy < this.speed) {
        pos.vy++;
      }
    }
    if(pos.key[68] || pos.key[39]){
      if(pos.vx < this.speed) {
        pos.vx++;
      }
    }
    if(pos.key[65] || pos.key[37]){
      if(pos.vx > -this.speed) {
        pos.vx--;
      }
    }
    
    Math.floor(pos.vy *= this.friction);
    Math.floor(pos.y += pos.vy);
    Math.floor(pos.vx *= this.friction);
    Math.floor(pos.x += pos.vx);
  }
  
  this.draw = function(){
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.ctx.drawImage(this.bg, pos.x, pos.y, this.cw, this.ch, 0, 0, this.cw, this.ch);
  };
}

function Thing(ctx, x, y){
  this.sAngle = 0;
  this.eAngle = Math.PI * 2;
  
  this.draw = function(){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x/2, y/2, 10, this.sAngle, this.eAngle);
    ctx.fill();
    ctx.closePath();
  };
  
  this.shoot = function(){
    if(pos.b.length > 0){
      for(var i = 0; i < pos.b.length; i++){
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(pos.b[i][0], pos.b[i][1], 3, this.sAngle, this.eAngle);
        ctx.fill();    
        ctx.closePath();
      }
    }
  }
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("click", function (e) { 
  pos.b.push([e.clientX,e.clientY, pos.x, pos.y]);
 });

window.addEventListener("keydown", function (e) {
pos.key[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
pos.key[e.keyCode] = false;
});

window.addEventListener('load', draw);