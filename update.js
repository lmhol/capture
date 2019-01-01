var c = document.getElementById('c'),
    cw = c.width = window.innerWidth,
    ch = c.height = window.innerHeight,
    ctx = c.getContext("2d"),
    cf = ctx.font = "30px Arial",
    bg = new Image(),
    bgs = bg.src = "V3_noOcean-min.png",
    x = Random(0, 14852),
    y = Random(0, 6378),
    px = cw/2,
    py = ch/2,
    vx = 0,
    vy = 0,
    score = 0,
    fScore = 0,
    time = 60,
    fTime = 0,
    bShot = 0,
    zKill = 0,
    b = [],
    z = [],
    key = [],
    city = Random(0, 204),
    cFound = 0;

function Bullets(){

  for (var i=0; i < b.length; i++){
    var ba = b[i][4] > b[i][2] && b[i][0] < b[i][2],
        bb = b[i][4] < b[i][2] && b[i][0] > b[i][2],
        bc = b[i][4] === 0,
        bd = b[i][5] === 0,
        be = b[i][5] > b[i][3] && b[i][1] < b[i][3],
        bf = b[i][5] < b[i][3] && b[i][1] > b[i][3];

    b[i][0] += (b[i][2] - b[i][4]) * .08;
    b[i][1] += (b[i][3] - b[i][5]) * .08;
    b[i][2] -= vx * .32;
    b[i][3] -= vy * .32;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(b[i][0], b[i][1], 2, 0, Math.PI * 2);
    ctx.fill();

    if(ba && be || //tl
       ba && bd || //cl
       ba && bf || //bl
       bc && be || //tc
       bc && bf || //bc
       bb && be || //tr?
       bb && bd || //cr?
       bb && bf ){ //br?
       b.splice(i, 1);
    }
  }
}

function Load(){

    var btn = document.createElement("button");
        btn.style.cssText = "position:absolute; zIndex:2; height:5%; width:10%; top:47.5%; left:45%;";
        btn.onclick = function(){
          btn.parentNode.removeChild(btn);
          document.body.style.backgroundColor = "#d1ecfd";
          Update();
          z = [];
          time = 60;
          score = 0;
          cf = ctx.font = "30px Arial";
        };
    var t = document.createTextNode("Begin Game");

    btn.appendChild(t);
    document.body.appendChild(btn);
}

function Menu(){
  document.body.style.backgroundColor = "blue";
  Load();
}

function Movement(){

  var speed = 500,
      friction = .82;

//keypress movement
  if(key[87] || key[38]) { //up
    if(vy > -speed) {
      vy--;
    }
  }
  if(key[83] || key[40]) { //down
    if(vy < speed) {
      vy++;
    }
  }
  if(key[68] || key[39]) { //right
    if(vx < speed) {
      vx++;
    }
  }
  if(key[65] || key[37]) { //left
    if(vx > -speed) {
      vx--;
    }
  }

//velocity
  vy *= friction;
   y += vy;
  vx *= friction;
   x += vx;

//map edge loop
  if(x > 12600 && y < 1600){                // east of russia
    x = 2343;
  }
  if(x < 2343  && y < 1600){                // west of alaska
    x = 12600;
  }
  if(x > 13352 && y <= 5378 && y >= 1600) {   // east of nauru
    x = 1501;
  }
  if(x < 1500 && y <= 5378 && y >= 1600) {   // west of nauru
    x = 13353;
  }
  if(x > 13248 && y > 5378){                // east of new zealand
    x = 1396;
  }
  if(x < 1396  && y > 5378){                // west towards new zealand
    x = 13248;
  }
  if(y <= py) {                             // north boundary
      y = py;
  }
  if(y >= 6378 - py) {                      // south boundary
      y = 6378 - py;
  }
}

function City() {

var coor =
[["Nuku'alofa", "Tonga", 1814, 4015], ["Apia", "Samoa", 1858, 3730], ["Kabul", "Afghanistan", 9561, 1841], ["Tirana", "Albania", 8021, 1577], ["Algiers", "Algeria", 7518, 1754], ["Andorra la Vella", "Andorra", 7471, 1529], ["Luanda", "Angola", 7856, 3534], ["St. John's", "Antigua and Barbuda", 5430, 2519], ["Buenos Aires", "Argentina", 5622, 4540], ["Yerevan", "Armenia", 8770, 1621], ["Canberra", "Australia", 12017, 4566], ["Vienna", "Austria", 7900, 1313], ["Baku", "Azerbaijan", 8930, 1612], ["Nassau", "Bahamas", 4970, 2208], ["Manama", "Bahrain", 9026, 2164], ["Dhaka", "Bangladesh", 10304, 2262], ["Bridgetown", "Barbados", 5492, 2675], ["Minsk", "Belarus", 8197, 1099], ["Brussels", "Belgium", 7549, 1213], ["Belmopan", "Belize", 4562, 2515], ["Porto-Novo", "Benin", 7507, 2939], ["Cotonou", "Benin", 7498, 2940], ["Thimphu", "Bhutan", 10253, 2116], ["Sucre", "Bolivia", 5327, 3932], ["La Paz", "Bolivia", 5224, 3833], ["Sarajevo", "Bosnia and Herzegovina", 7971, 1479], ["Gaborone", "Botswana", 8248, 4152], ["Brasilia", "Brazil", 5876, 3805], ["Bandar Seri Begawan", "Brunei", 11180, 2998], ["Sofia", "Bulgaria", 8122, 1524], ["Ouagadougou", "Burkina Faso", 7375, 2706], ["Naypyidaw", "Burma", 10511, 2417], ["Bujumbura", "Burundi", 8385, 3321], ["Praia", "Cabo Verde", 6662, 2603], ["Phnom Penh", "Cambodia", 10835, 2738], ["Yaounde", "Cameroon", 7801, 3038], ["Ottawa", "Canada", 5192, 1419], ["Bangui", "Central African Republic", 8031, 3019], ["N'Djamena", "Chad", 7914, 2716], ["Santiago", "Chile", 5235, 4495], ["Beijing", "China", 10945, 1631], ["Bogota", "Colombia", 5004, 3010], ["Moroni", "Comoros ", 8830, 3647], ["San Jose", "Costa Rica", 4687, 2801], ["Yamoussoukro", "Cote d'Ivoire", 7253, 2923], ["Abidjan", "Cote d'Ivoire", 7293, 2980], ["Zagreb", "Croatia", 7896, 1405], ["Havana", "Cuba", 4799, 2286], ["Nicosia", "Cyprus", 8453, 1816], ["Prague", "Czechia", 7841, 1242], ["Kinshasa", "Democratic Republic of the Congo", 7931, 3360], ["Copenhagen", "Denmark", 7772, 1034], ["Djibouti", "Djibouti ", 8827, 2736], ["Roseau", "Dominica", 5440, 2589], ["Santo Domingo", "Dominican Republic", 5175, 2468], ["Quito", "Ecuador", 4857, 3198], ["Cairo", "Egypt", 8404, 2016], ["San Salvador", "El Salvador", 4533, 2654], ["Malabo", "Equatorial Guinea", 7712, 3043], ["Asmara", "Eritrea", 8684, 2591], ["Tallinn", "Estonia", 8086, 899], ["Mbabane", "Eswatini", 8410, 4217], ["Lobamba", "Eswatini", 8415, 4222], ["Addis Ababa", "Ethiopia ", 8686, 2836], ["Helsinki", "Finland", 8087, 873], ["Paris", "France", 7492, 1289], ["Libreville", "Gabon", 7734, 3175], ["Banjul", "Gambia", 6887, 2664], ["Tbilisi", "Georgia", 8769, 1562], ["Berlin", "Germany", 7804, 1151], ["Accra", "Ghana", 7418, 2973], ["Athens", "Greece", 8148, 1707], ["St. George's", "Grenada ", 5420, 2717], ["Guatemala City", "Guatemala", 4494, 2619], ["Conakry", "Guinea", 6983, 2817], ["Bissau", "Guinea-Bissau", 6918, 2726], ["Georgetown", "Guyana", 5526, 2924], ["Port-au-Prince", "Haiti", 5097, 2465], ["Tegucigalpa", "Honduras", 4599, 2639], ["Budapest", "Hungary", 7982, 1341], ["Reykjavik", "Iceland", 6866, 735], ["New Delhi", "India", 9853, 2073], ["Jakarta", "Indonesia ", 10913, 3430], ["Tehran", "Iran", 9006, 1797], ["Baghdad", "Iraq", 8801, 1888], ["Dublin", "Ireland", 7249, 1121], ["Jerusalem", "Israel", 8522, 1948], ["Rome", "Italy", 7799, 1555], ["Kingston", "Jamaica", 4952, 2487], ["Tokyo", "Japan", 11722, 1796], ["Amman", "Jordan", 8544, 1941], ["Astana", "Kazakhstan", 9463, 1201], ["Nairobi", "Kenya ", 8629, 3239], ["Pristina", "Kosovo", 8056, 1524], ["Kuwait City", "Kuwait", 8931, 2042], ["Bishkek", "Kyrgyzstan", 9652, 1517], ["Vientiane", "Laos", 10730, 2487], ["Riga", "Latvia", 8084, 988], ["Beirut", "Lebanon", 8524, 1866], ["Maseru", "Lesotho", 8288, 4334], ["Monrovia", "Liberia", 7078, 2942], ["Tripoli", "Libya ", 7834, 1904], ["Vaduz", "Liechtenstein", 7704, 1354], ["Vilnius", "Lithuania", 8130, 1070], ["Luxembourg", "Luxembourg", 7602, 1260], ["Skopje", "Macedonia ", 8067, 1551], ["Antananarivo", "Madagascar", 8953, 3928], ["Lilongwe", "Malawi", 8520, 3736], ["Kuala Lumpur", "Malaysia", 10750, 3065], ["Male", "Maldives", 9827, 3027], ["Bamako", "Mali", 7165, 2695], ["Valletta", "Malta", 7871, 1787], ["Nouakchott", "Mauritania", 6910, 2483], ["Port Louis", "Mauritius", 9270, 3977], ["Mexico City", "Mexico", 4255, 2447], ["Chisinau", "Moldova", 8269, 1358], ["Monaco", "Monaco", 7645, 1482], ["Ulaanbaatar", "Mongolia", 10537, 1324], ["Podgorica", "Montenegro", 8001, 1533], ["Cetinje", "Montenegro", 7992, 1538], ["Rabat", "Morocco", 7213, 1861], ["Maputo", "Mozambique ", 8457, 4203], ["Windhoek", "Namibia", 7970, 4071], ["Kathmandu", "Nepal", 10115, 2106], ["Amsterdam", "Netherlands", 7564, 1157], ["Managua", "Nicaragua", 4623, 2714], ["Niamey", "Niger", 7493, 2661], ["Abuja", "Nigeria", 7670, 2834], ["Pyongyang", "North Korea", 11243, 1666], ["Oslo", "Norway", 7711, 881], ["Muscat", "Oman", 9291, 2267], ["Islamabad", "Pakistan", 9690, 1873], ["Ngerulmud", "Palau", 11817, 2897], ["Panama City", "Panama", 4833, 2839], ["Port Moresby", "Papua New Guinea", 12219, 3559], ["Asuncion", "Paraguay", 5596, 4177], ["Lima", "Peru", 4922, 3660], ["Manila", "Philippines", 11342, 2618], ["Warsaw", "Poland", 8020, 1160], ["Lisbon", "Portugal", 7147, 1677], ["Doha", "Qatar", 9060, 2201], ["Brazzaville", "Republic of the Congo", 7918, 3355], ["Bucharest", "Romania", 8198, 1457], ["Moscow", "Russia", 8464, 1031], ["Kigali", "Rwanda", 8408, 3265], ["San Marino", "San Marino", 7795, 1475], ["Sao Tome", "Sao Tome and Principe", 7645, 3176], ["Riyadh", "Saudi Arabia ", 8911, 2227], ["Dakar", "Senegal", 6863, 2612], ["Belgrade", "Serbia", 8030, 1442], ["Victoria", "Seychelles", 9237, 3369], ["Freetown", "Sierra Leone", 6999, 2860], ["Singapore", "Singapore", 10821, 3135], ["Bratislava", "Slovakia", 7922, 1315], ["Ljubljana", "Slovenia", 7852, 1395], ["Mogadishu", "Somalia", 8908, 3109], ["Pretoria", "South Africa ", 8319, 4194], ["Bloemfontein", "South Africa ", 8248, 4326], ["Cape Town", "South Africa ", 7995, 4513], ["Seoul", "South Korea", 11303, 1723], ["Juba", "South Sudan", 8457, 3001], ["Madrid", "Spain", 7314, 1613], ["Colombo", "Sri Lanka", 10031, 2918], ["Sri Jayewardenepura Kotte", "Sri Lanka", 10038, 2923], ["Basseterre", "St. Kitts and Nevis", 5403, 2512], ["Castries", "St. Lucia", 5449, 2641], ["Kingstown", "St. Vincent and the Grenadines", 5439, 2673], ["Khartoum", "Sudan", 8477, 2580], ["Paramaribo", "Suriname", 5623, 2962], ["Stockholm", "Sweden ", 7909, 902], ["Bern", "Switzerland", 7643, 1362], ["Damascus", "Syria", 8549, 1881], ["Taipei", "Taiwan", 11284, 2211], ["Dushanbe", "Tajikistan", 9517, 1684], ["Dodoma", "Tanzania", 8592, 3430], ["Dar es Salaam", "Tanzania", 8706, 3456], ["Bangkok", "Thailand", 10683, 2653], ["Dili", "Timor-Leste", 11518, 3524], ["Lome", "Togo", 7465, 2950], ["Port of Spain", "Trinidad and Tobago ", 5423, 2773], ["Tunis", "Tunisia", 7737, 1753], ["Ankara", "Turkey", 8419, 1632], ["Ashgebat", "Turkmenistan", 9205, 1708], ["Kampala", "Uganda", 8490, 3177], ["Kyiv", "Ukraine", 8300, 1229], ["Abu Dhabi", "United Arab Emirates", 9153, 2234], ["London", "United Kingdom", 7421, 1189], ["Washington DC", "United States", 5086, 1671], ["Montevideo", "Uruguay ", 5693, 4551], ["Tashkent", "Uzbekistan", 9508, 1578], ["Vatican CIty", "Vatican City", 7799, 1555], ["Caracas", "Venezuela", 5251, 2779], ["Hanoi", "Vietnam", 10815, 2368], ["Sana'a", "Yemen", 8855, 2590], ["Lusaka", "Zambia", 8340, 3793], ["Harare", "Zimbabwe ", 8425, 3887], ["Palikir", "Micronesia", 12586, 2919], ["Honiara", "Solomon Islands", 12635, 3558], ["Wellington", "New Zealand", 12681, 4801], ["Port Vila", "Vanuatu", 12849, 3883], ["", "Nauru", 12885, 3209], ["Majuro", "Marshall Islands", 13017, 2912], ["Tarawa", "Kiribati", 13084, 3137], ["Suva", "Fiji", 13171, 3898], ["Funafuti", "Tuvalu", 13267, 3522]];

  // current flag location
  ctx.fillStyle = "blue";
  ctx.beginPath();
  if (city <= 1){
    if(x >= 12352){
      ctx.arc((coor[city][2]-3000)+14852-x+px, py + coor[city][3] - y, 5, 0, Math.PI * 2);
    } else if (x < 12352){
      ctx.arc(px + coor[city][2] - x, py + coor[city][3] - y, 5, 0, Math.PI * 2);
    }
  } else if(city > 1 && city < 196){
    ctx.arc(px + coor[city][2] - x, py + coor[city][3] - y, 5, 0, Math.PI * 2);
  } else if (city >= 196){
    if(x <= 2500){
      ctx.arc((-11852 + px + coor[city][2]) - x, py + coor[city][3] - y, 5, 0, Math.PI * 2);
    } else if (x > 2500){
      ctx.arc(px + coor[city][2] - x, py + coor[city][3] - y, 5, 0, Math.PI * 2);
    }
  }
  ctx.fill();

  // update top values
  ctx.fillStyle = "black";

  if(city === 200){
    ctx.fillText(coor[city][1], 20, 40);
  } else if(city > 200 || city < 200){
    ctx.fillText(coor[city][0].concat(", ").concat(coor[city][1]), 20, 40);
  }

  if(x < coor[city][2] + 10){
    if(x > coor[city][2] - 10){
      if(y < coor[city][3] + 10){
        if(y > coor[city][3] - 10){
          if(time<=0||score<0){
          } else {
            score += time;
            time += 10;
            city = Random(0, 204);
            cFound++;
          }
  }}}};
}

function Random(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function timeAndScore(){
  ctx.fillStyle = "black";
  ctx.beginPath();
  if(time < 1 || score < 0) {
    var final = Math.floor(fScore + fTime + (zKill*(zKill/bShot*100)) + (cFound*10));
    clearInterval(tickTock);
    time = 0;
    ctx.fillText("Game Over", px - 86, py - 50);
    if((fTime%60)<10){
      ctx.fillText("Total Time: " + Math.floor(fTime/60) + ":" + "0" + fTime % 60, 20 , 80);
    } else {
      ctx.fillText("Total Time: " + Math.floor(fTime/60) + ":" + fTime % 60, 20 , 80);
    }
    ctx.fillText("Final Score: " + final, 20, 120);
    ctx.fillText("Zombies Killed: " + zKill, 20, 160);
    ctx.fillText("Bullets Shot: " + bShot, 20, 200);
    ctx.fillText("Accuracy: " + Math.floor(zKill/bShot*100) + "%", 20, 240);
    ctx.fillText("Cities Found: " + cFound, 20, 280);
    ctx.fillText("Play Again", px - 60, py + 40);
    ctx.fillRect(px - 70, py + 50, 150, 50);

    document.body.addEventListener("click", function (e) {
      if(e.clientX > (px - 70) && e.clientX < (px + 80) && e.clientY > (py + 50) && e.clientY < (py + 100)){
        function myFunction(){
          location.reload();
        }
        myFunction();
      }
    });
  } else {
    fScore = score;
    ctx.fillText("Time: " + time, 20, 80);
    ctx.fillText("Hit Points: " + score, 20, 120);
  }
  ctx.fill();
}

function Zombies(){

  if(z.length < 1){
     z.push([px, py, Random(-cw * 3, cw * 3), Random(-cw * 3, cw * 3)]);
  }

  for (var i=0; i < z.length; i++){

    z[i][2] -= vx;
    z[i][3] -= vy;
    z[i][2] -= (Random(0, z[i][2]) - Random(0, z[i][0])) * .01 + Random(-5,5);
    z[i][3] -= (Random(0, z[i][3]) - Random(0, z[i][1])) * .01 + Random(-5,5);
    z[i][4] --;

    if(z[i][2] < px + 200 && z[i][2] > px - 200 && z[i][3] < py + 200 && z[i][3] > py - 200){
      z[i][2] -= (z[i][2] - z[i][0]) * .08 + Random(-7,7);
      z[i][3] -= (z[i][3] - z[i][1]) * .08 + Random(-7,7);

      if(z[i][2] < px + 10 && z[i][2] > px - 10 && z[i][3] > py - 10 && z[i][3] < py + 10){
        score -= 500;
        z.splice(i, 1);
      }
    }

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(z[i][2], z[i][3], 5, 0, Math.PI * 2);
    ctx.fill();

    for (var j=0; j < b.length; j++){
      var za = b[j][0] > z[i][2] && b[j][0] < z[i][2] + 10,
          zb = b[j][0] < z[i][2] && b[j][0] > z[i][2] - 10,
          zc = b[j][0] === z[i][2],
          zd = b[j][1] > z[i][3] && b[j][1] < z[i][3] + 10,
          ze = b[j][1] < z[i][3] && b[j][1] > z[i][3] - 10,
          zf = b[j][1] === z[i][3];

      if(za && zd || //tl
         za && zf || //cl
         za && ze || //bl
         zc && zd || //tc
         zc && ze || //bc
         zb && zd || //tr
         zb && zf || //cr
         zb && ze ){ //br
           if(time<=0||score<0){
           } else{
          z.splice(i, 1);
          z.push([px, py, Random(-cw*3, cw*3), Random(-ch*3, ch*3)]);
          b.splice(j, 1);
          score += 10;
          zKill++;
        }
      }
    }
  }
}

function Update() {
    requestAnimationFrame(Update);
    Movement();

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(bg, x - px, y - py, cw, ch, 0, 0, cw, ch);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.fill();

    Zombies();

    if(b.length>0){
      Bullets();
    }

    City();
    timeAndScore();
}

var tickTock = setInterval(function() {
  time--;
  fTime++;
}, 1000);

setInterval(function() {
  z.shift();
  z.push([px, py, Random(-cw * 3, cw * 3), Random(-cw * 3, cw * 3)]);
  z.push([px, py, Random(-cw * 3, cw * 3), Random(-cw * 3, cw * 3)]);
}, 10000);

Menu();

window.oncontextmenu = function (){
    return false;
}
window.onresize = function (){
  cw = c.width = window.innerWidth;
  ch = c.height = window.innerHeight;
  cf = ctx.font = "30px Arial";
  px = cw/2;
  py = ch/2;
}
document.body.addEventListener("click", function (e) {
  b.push([px, py, e.clientX, e.clientY, px, py]);
  if(time<=0||score<0){
  } else{bShot++;}
});
document.body.addEventListener("keydown", function (e) {
  key[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
  key[e.keyCode] = false;
});
