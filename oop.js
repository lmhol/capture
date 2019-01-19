function initCanvas() {
  let ctx = document.getElementById('c').getContext("2d"),
      cw = ctx.canvas.width  = window.innerWidth,
      ch = ctx.canvas.height = window.innerHeight,
      animateInterval = setInterval(Animate, 30),
      zombieSpawner = setInterval(Spawner, 1000),
      px = cw/2,
      py = ch/2,
      zombies = [];

  function Animate(){
    ctx.save();
    ctx.clearRect(0, 0, cw, ch);
    //Draw here
    for(let i=0; i<zombies.length;i++){
      zombies[i].render(ctx, zombies[i].x, zombies[i].y, px, py);
      zombies[i].x -= (Random(0, zombies[i].x) - Random(0, px)) * .01;
      zombies[i].y -= (Random(0, zombies[i].y) - Random(0, py)) * .01;
    }
    Player(ctx);
    ctx.restore();
  }

  function Player(){
    this.color = "black";
    this.x = px;
    this.y = py;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function Spawner(){
    zombies.push(new Zombie());
  }

  function Zombie(){
    this.x = Random(-cw * 3, cw * 3),
    this.y = Random(-ch * 3, ch * 3),
    this.radius = 5,
    this.sAngle = 0,
    this.eAngle = Math.PI * 2,
    this.color = "green";

    this.render = function(ctx, zx, zy, px, py){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(zx, zy, this.radius, this.sAngle, this.eAngle);
      ctx.fill();
    }
  }

}

function Random(min, max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

window.addEventListener('load', function(event){
  initCanvas();
})
