var pos = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  af: 0,
  key:[],
  b: [],
  z: []
}

function draw(){
  let map = new Map(),
      player = new Thing(map.ctx, map.cw, map.ch),
      bullet = new Thing(map.ctx, map.cw, map.ch),
      zombie = new Thing(map.ctx, map.cw, map.ch);
      
  requestAnimationFrame(draw);
  map.draw();
  player.move();
  bullet.shoot();
  zombie.crawl();
}

function Map(){
  this.ctx = document.getElementById('c').getContext("2d");
  this.cw = this.ctx.canvas.width  = window.innerWidth;
  this.ch = this.ctx.canvas.height = window.innerHeight;
  this.bg = new Image();
  this.bg.src = "v4.png";
  this.speed = 10;
  this.friction = .8;
  
  this.draw = function(e){
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
    
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.ctx.drawImage(this.bg, pos.x, pos.y, this.cw, this.ch, 0, 0, this.cw, this.ch);
  }
}

function Thing(ctx, x, y){
  this.sAngle = 0;
  this.eAngle = Math.PI * 2;
  
  this.move = function(){
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x/2, y/2, 10, this.sAngle, this.eAngle);
    ctx.fill();
    ctx.closePath();
  };
  
  this.shoot = function(){
    if(pos.b.length > 0){
      for(var i = 0; i < pos.b.length; i++){
        let i0 = pos.b[i][0],
            i1 = pos.b[i][1],
            i2 = pos.b[i][2],
            i3 = pos.b[i][3],
            i4 = pos.b[i][4],
            i5 = pos.b[i][5],
            i6 = pos.b[i][6],
            i7 = pos.b[i][7],
            left = i4 > i2 && i0 < i2,
            right = i4 < i2 && i0 > i2,
            xCenter = i4 === i2 === 0,
            yCenter = i5 === i3 === 0,
            top = i5 > i3 && i1 < i3,
            bottom = i5 < i3 && i1 > i3,
            speed = .25;
                
        pos.b[i][0] += (i6 - i4) * speed; 
        pos.b[i][1] += (i7 - i5) * speed; 
        pos.b[i][2] -= pos.vx * (speed * 4);
        pos.b[i][3] -= pos.vy * (speed * 4);
        pos.b[i][8]--;
        
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(pos.b[i][0], pos.b[i][1], 2, this.sAngle, this.eAngle);
        ctx.fill();    
        ctx.closePath();
        
        if(top    && left    ||
           top    && xCenter ||
           top    && right   ||
           left   && yCenter ||
           right  && yCenter ||
           bottom && left    ||
           bottom && xCenter ||
           bottom && right   ||
           pos.b[i][8] <= 0  ){
             pos.b.splice(i, 1);
         }
      }
    }
  }
  
  this.crawl = function(){
    if(pos.z.length <= 10){
      pos.z.push([random(0, x), random(0, y), x/2, y/2]);
    }
    
    for(var i = 1; i < pos.z.length; i++){
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(pos.z[i][0], pos.z[i][1], 5, this.sAngle, this.eAngle);
      ctx.fill();    
      ctx.closePath();
    }
  }
}

function random(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("click", function(e) { 
  let mX = e.clientX,
      mY = e.clientY,
      w = window.innerWidth,
      h = window.innerHeight;
      
  pos.b.push([w/2, h/2, mX, mY, w/2, h/2, mX, mY, 10]);
});

window.addEventListener("mousedown", function(e) { 
  let mX = e.clientX,
      mY = e.clientY,
      w = window.innerWidth,
      h = window.innerHeight;
      
  pos.af = 1;
  
  document.body.addEventListener("mousemove", function(e) {
    if(pos.af==1){
      mX = e.clientX;
      mY = e.clientY;
    }
  });
  
  autofire = setInterval( function(){
    pos.b.push([w/2, h/2, mX, mY, w/2, h/2, mX, mY, 10]);
  }, 100);
});

window.addEventListener("mouseup", function(e) { 
  pos.af = 0;
  clearInterval(autofire);
});

window.addEventListener("keydown", function(e) {
  pos.key[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
  pos.key[e.keyCode] = false;
});

window.addEventListener('load', draw);