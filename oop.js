function initCanvas() {
  let ctx = document.getElementById('c').getContext("2d"),
      cw = ctx.canvas.width  = window.innerWidth,
      ch = ctx.canvas.height = window.innerHeight,
      animateInterval = setInterval(Animate, 30),
      zombieSpawner = setInterval(Spawner, 1000),
      z = [];

  function Animate(){
    ctx.save();
    ctx.clearRect(0, 0, cw, ch);
    //Draw here
    Player(ctx, cw, ch);
    drawZombies();

    ctx.restore();
  }

  function drawZombies(){

    for(let i=0; i<z.length;i++){
      z[i].render(ctx, cw, ch);
    }

  }

  function Spawner(){
    z.push(new Zombie(ctx, cw, ch));
  }

}

function Player(ctx, cw, ch){
  this.color = "black";
  this.x = cw/2;
  this.y = ch/2;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function Random(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function Zombie(ctx, cw, ch){
  this.x = Random(-cw/2 * 6, cw/2 * 6),
  this.y = Random(-ch/2 * 6, ch/2 * 6),
  this.radius = 5,
  this.sAngle = 0,
  this.eAngle = Math.PI * 2,
  this.color = "green";

  this.render = function(){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
    ctx.fill();

    this.x -= (Random(0, this.x) - Random(0, cw/2)) * .01;
    this.y -= (Random(0, this.y) - Random(0, ch/2)) * .01;
  }
}

window.addEventListener('load', function(event){
  initCanvas();
})
