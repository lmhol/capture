function initCanvas() {
  let ctx = document.getElementById('c').getContext("2d"),
      cw = ctx.canvas.width  = window.innerWidth,
      ch = ctx.canvas.height = window.innerHeight,
      animateInterval = setInterval(Animate, 30),
      zombieSpawner = setInterval(Spawn, 1000),
      z = [];

  function Animate(){
    ctx.save();
    ctx.clearRect(0, 0, cw, ch);
    //Draw here
    Player(ctx, cw, ch);
    Zombies();
    //Finish
    ctx.restore();
  }

  function Zombies(){
    for(let i = 0; i < z.length; i++){
      /* zombie bites and dies */
      if(z[i].x < z[i].px + 10 &&
         z[i].x > z[i].px - 10 &&
         z[i].y > z[i].py - 10 &&
         z[i].y < z[i].py + 10    ){
//        score -= 500;
         z.splice(i, 1);
      }
      z[i].render(ctx, cw, ch);
    }
  }

  function Spawn(){
    z.push(new Zombie(ctx, cw, ch));
  }
}

function Player(ctx, cw, ch){
  this.x = cw/2;
  this.y = ch/2;
  this.radius = 10,
  this.sAngle = 0,
  this.eAngle = Math.PI * 2,
  this.color = "black";

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
  ctx.fill();
}

function Random(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Zombie(ctx, cw, ch){
  this.px = cw/2,
  this.py = ch/2;
  this.x = Random(-this.px * 5, this.px * 5),
  this.y = Random(-this.py * 5, this.py * 5),
  this.radius = 5,
  this.sAngle = 0,
  this.eAngle = Math.PI * 2,
  this.color = "green";

  this.render = function(){
    this.x -= (Random(0, this.x) - Random(0, this.px)) * .01;
    this.y -= (Random(0, this.y) - Random(0, this.py)) * .01;

  /* rushes at player */
   if(this.x < this.px + 300 &&
      this.x > this.px - 300 &&
      this.y < this.py + 300 &&
      this.y > this.py - 300    ){

      this.x -= (this.x - this.px) * .04;
      this.y -= (this.y - this.py) * .04;
    }

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
    ctx.fill();
  }
}

window.addEventListener('load', function(event){
  initCanvas();
})
