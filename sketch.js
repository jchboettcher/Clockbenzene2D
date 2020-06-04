
var side = 80;
var inside = 1;
var startMil = 0;
var aMpM = 0;
var secon = 0;
var minut = 0;
var hou = 0;
var hydrogenLess = 0.8;

function setup() {
  createCanvas(800*0.78, 1162*0.78);
  angleMode(DEGREES);
}

function traverse(x,y,trans) {
  line(0,0,x,y);
  if (trans) {
    translate(x,y);
  }
}

function wedge(x,y,trans,r,g,b) {
  push();
  let k = 2.5/sqrt(x*x + y*y);
  fill(r,g,b);
  triangle(0,0,x - k*y, y + k*x, x + k*y, y - k*x);
  pop();
  if (trans) {
    translate(x,y);
  }
}

function dashes(x,y,trans) {
  let numDashes = 10;
  let k = 3/sqrt(x*x + y*y);
  for (let z = 1; z <= numDashes; z++) {
    line((x - k*y)*z/numDashes, (y + k*x)*z/numDashes, (x + k*y)*z/numDashes, (y - k*x)*z/numDashes);
  }
  if (trans) {
    translate(x,y);
  }
}

function drawBond(x,y,r,trans,r0,g,b) {
  if (r == 2) {
    traverse(x,y,trans);
  }
  else if (r == 0) {
    wedge(x,y,trans,r0,g,b);
  }
  else {
    dashes(x,y,trans);
  }
}

function dots(x,y) {
  hi = [1/55,2/55,3/55,4/55,5/55,6/55,7/55,8/55,9/55,10/55];
  for (let z = 0; z < 10; z++) {
    translate(x*hi[z],y*hi[z]);
    poMath.floor(0,0);
  }
}

function drawBenzene() {
  push();
  translate(side/2*(2+sqrt(3)),-side/2);
  if (Math.floor(Math.random()*50) == 0) {
    inside = 1 - inside;
  }
  for (let x = 0; x < 12; x++) {
    traverse(0,side,true);
    rotate(30);
  }
  let far = 15;
  translate(-(side/far)/2*(2+sqrt(3)),(side/far)/2);
  for (let x = 0; x < 12; x++) {
    stroke(((x + inside) % 2) * 255)
    traverse(0,side*(1-1/far),true);
    rotate(30);
  }
  pop();
}

function drawRotating(mill) {
  push();
  let sec = secon;
  stroke(255);
  let milli = (secon % 5) * 1000 + mill;
  let angleMin = 0;
  let type = 1 - aMpM;
  let angle1s = [[-32,-60,20],[-20,-60,32]];
  let angle2s = [[-20,60,32],[-32,60,20]];
  if (milli >= 350 * 5) {
    angle1 = between(angle1s[aMpM][1],angle1s[aMpM][2],milli - 350 * 5,650 * 5);
  }
  else {
    angle1 = between(angle1s[aMpM][0],angle1s[aMpM][1],milli,350 * 5);
    type = aMpM;
  }
  let offset = 12.5;
  let len = hydrogenLess*side * sin(angle1);
  let k = offset/sqrt(len*len + side*side/4);
  drawBond(len, hydrogenLess*side/2, type, false, 255,255,255);
  drawH(len*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(sec/5)*30);
  if (milli < 650 * 5) {
    angle2 = between(angle2s[aMpM][0],angle2s[aMpM][1],milli,650 * 5);
    type = 1 - aMpM;
  }
  else {
    angle2 = between(angle2s[aMpM][1],angle2s[aMpM][2],milli - 650 * 5,350 * 5);
    type = aMpM;
  }
  len = hydrogenLess*side * sin(angle2);
  k = offset/sqrt(len*len + side*side/4);
  drawBond(len, hydrogenLess*side/2, type, false, 255,255,255);
  drawH(len*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(sec/5)*30);
  pop();
}

function drawSecond(mill) {
  push();
  let sec = secon;
  stroke(255, 100, 150);
  rotate(Math.floor(sec/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  let secDir = ((sec % 5) -2) * 24 - 12;
  let angle = secDir + mill * 24/1000
  if (aMpM == 0) {
    drawRotating(mill);
  }
  push();
  drawBond(-side * sin(angle),side/2,aMpM, true, 255, 100, 150);
  traverse(0,side,true);
  pop();
  if (aMpM == 1) {
    drawRotating(mill);
  }
  pop();
  push();
  stroke(255, 100, 150);
  rotate(Math.floor(sec/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  pop();
}

function textH() {
  push();
  noFill();
  strokeWeight(1);
  beginShape();
  vertex(-1.5,-1.25);
  vertex(-1.5,-5);
  vertex(-4,-5);
  vertex(-4,5);
  vertex(-1.5,5);
  vertex(-1.5,1.25);
  vertex(1.5,1.25);
  vertex(1.5,5);
  vertex(4,5);
  vertex(4,-5);
  vertex(1.5,-5);
  vertex(1.5,-1.25);
  endShape(CLOSE);
  pop();
}

function drawH(x,y,rot) {
  push();
  translate(x,y);
  rotate(rot);
  textH();
  pop();
}

function between(front, back, placement, outOf) {
  return (front + placement * (back - front) / outOf);
}

function hydrogens(minu, type, milli, r, g, b) {
  push();
  stroke(r,g,b);
  let pos = minu % 5;
  let type1 = [1 - type, 1 - type, 1 - type, 2, type][pos];
  let type2 = [type, 2, 1 - type, 1 - type, 1 - type][pos];
  let angles1 = [[-32,32,40,60,20,20],[-20,20,40,60,32,32]][1 - type];
  let angles2 = [[-20,-60,-40,-32,32,32],[-32,-60,-40,-20,20,20]][1 - type];
  angle1 = between(angles1[pos],angles1[pos+1],milli,5000);
  angle2 = between(angles2[pos],angles2[pos+1],milli,5000);
  if (pos == 1 && milli > 0) {
    type2 = 1 - type;
  }
  if (pos == 3 && milli > 0) {
    type1 = type;
  }
  let len1 = hydrogenLess*side * sin(angle1);
  let len2 = hydrogenLess*side * sin(angle2);
  let offset = 12.5;
  let k = offset/sqrt(len1*len1 + side*side/4);
  drawBond(len1, hydrogenLess*side/2, type1, false, r, g, b);
  drawH(len1*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(minu/5)*30);
  drawBond(len2, hydrogenLess*side/2, type2, false, r, g, b);
  k = offset/sqrt(len2*len2 + side*side/4);
  drawH(len2*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(minu/5)*30);
  pop();
}

function drawMinute(milli) {
  push();
  stroke(150, 100, 255);
  let minu = minut;
  let mill = 0;
  if (secon > 54) {
    mill = (secon % 5) * 1000 + milli;
  }
  let dashWedgeLine = 0;
  if ((minu % 5 == 0 || minu % 5 == 4) && !(minu % 5 == 0 && mill > 0)) {
    dashWedgeLine = 2;
  }
  else {
    dashWedgeLine = aMpM;
  }
  rotate(Math.floor(minu/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  let angles = [[-60,-20,0,20,60,60],[-60,-32,0,32,60,60]][1 - aMpM]
  angle = between(angles[minu % 5],angles[(minu % 5)+1],mill,5000);
  if (aMpM == 1) {
    drawBond(-side * sin(angle),side/2,dashWedgeLine, false, 150, 100, 255);
  }
  hydrogens(minu, aMpM, mill, 255, 255, 255);
  if (aMpM == 0) {
    drawBond(-side * sin(angle),side/2,dashWedgeLine, false, 150, 100, 255);
  }

  pop();
  push();
  stroke(150, 100, 255);
  rotate(Math.floor(minu/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  pop();
}

function drawHour() {
  push();
  stroke(150, 255, 100);
  rotate((hou % 12)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  pop();
}

function drawMethylH(mill,r,g,b) {
  push();
  let minu = minut;
  stroke(r,g,b);
  let milli = (secon % 5) * 1000 + mill;
  let angleMin = 0;
  let type = 1;
  if (aMpM == 0) {
    let angleMins = [32,60,-20];
    let angleHs = [-20,60,32];
    if (milli >= 350 * 5) {
      angleMin = between(angleMins[1],angleMins[2],milli - 350 * 5,650 * 5);
      drawBond(-side * sin(angleMin),side/2,type, false, r, g, b);
    }
    stroke(255);
    let offset = 12.5;
    if (milli < 650 * 5) {
      angleH = between(angleHs[0],angleHs[1],milli,650 * 5);
    }
    else {
      angleH = between(angleHs[1],angleHs[2],milli - 650 * 5,350 * 5);
      type = 0;
    }
    let len = hydrogenLess*side * sin(angleH);
    let k = offset/sqrt(len*len + side*side/4);
    drawBond(len, hydrogenLess*side/2, type, false, 255,255,255);
    drawH(len*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(secon/5)*30);
    if (milli < 350 * 5) {
      angleMin = between(angleMins[0],angleMins[1],milli,350 * 5);
      type = 0;
      stroke(r, g,b);
      drawBond(-side * sin(angleMin),side/2,type, false, r, g, b);
    }
  }
  else {
    let angleHs = [-32,60,20];
    let angleMins = [20,60,-32];
    if (milli < 350 * 5) {
      angleMin = between(angleMins[0],angleMins[1],milli,350 * 5);
      drawBond(-side * sin(angleMin),side/2,type, false, r, g, b);
    }
    stroke(255);
    let offset = 12.5;
    if (milli >= 650 * 5) {
      angleH = between(angleHs[1],angleHs[2],milli - 650 * 5,350 * 5);
    }
    else {
      angleH = between(angleHs[0],angleHs[1],milli,650 * 5);
      type = 0;
    }
    let len = hydrogenLess*side * sin(angleH);
    let k = offset/sqrt(len*len + side*side/4);
    drawBond(len, hydrogenLess*side/2, type, false, 255,255,255);
    drawH(len*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(secon/5)*30);
    if (milli >= 350 * 5) {
      angleMin = between(angleMins[1],angleMins[2],milli - 350 * 5,650 * 5);
      type = 0;
      stroke(r, g,b);
      drawBond(-side * sin(angleMin),side/2,type, false, r, g, b);
    }
  }
  pop();
}

function drawSecWith(mill,sec) {
  push();
  stroke(255, 100, 150);
  let secDir = ((sec % 5) -2) * 24 - 12;
  let angle = secDir + mill * 24/1000
  drawBond(-side * sin(angle),side/2,aMpM, true, 255, 100, 150);
  traverse(0,side,true);
  pop();
}

function drawSecMin() {
  push();
  let sec = secon;
  stroke(255);
  rotate(Math.floor(sec/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  var d = new Date();
  var mill = d.getMilliseconds();
  if (aMpM == 0) {
    drawMethylH(mill, 150, 100, 255);
  }
  drawSecWith(mill,sec);
  if (aMpM == 1) {
    drawMethylH(mill, 150, 100, 255);
  }
  pop();
}

function drawMethylMethyl(mill) {
  push();
  let minu = minut;
  stroke(150, 100, 255);
  let milli = (secon % 5) * 1000 + mill;
  let angleMin = 0;
  let type = 1;
  if (aMpM == 0) {
    let angleMins = [32,60,-20];
    let angleHrs = [20,-60,-32];
    if (milli >= 350 * 5) {
      angleMin = between(angleMins[1],angleMins[2],milli - 350 * 5,650 * 5);
      drawBond(-side * sin(angleMin),side/2,type, false, 150, 100, 255);
    }
    stroke(150, 255, 100);
    if (milli < 650 * 5) {
      angleHr = between(angleHrs[0],angleHrs[1],milli,650 * 5);
    }
    else {
      angleHr = between(angleHrs[1],angleHrs[2],milli - 650 * 5,350 * 5);
      type = 0;
    }
    drawBond(-side * sin(angleHr),side/2,type, false, 150, 255, 100);
    if (milli < 350 * 5) {
      angleMin = between(angleMins[0],angleMins[1],milli,350 * 5);
      type = 0;
      stroke(150, 100, 255);
      drawBond(-side * sin(angleMin),side/2,type, false, 150, 100, 255);
    }
  }
  else {
    let angleHrs = [32,-60,-20];
    let angleMins = [20,60,-32];
    if (milli < 350 * 5) {
      angleMin = between(angleMins[0],angleMins[1],milli,350 * 5);
      drawBond(-side * sin(angleMin),side/2,type, false, 150, 100, 255);
    }
    stroke(150, 255, 100);
    if (milli >= 650 * 5) {
      angleHr = between(angleHrs[1],angleHrs[2],milli - 650 * 5,350 * 5);
    }
    else {
      angleHr = between(angleHrs[0],angleHrs[1],milli,650 * 5);
      type = 0;
    }
    drawBond(-side * sin(angleHr),side/2,type, false, 150, 255, 100);
    if (milli >= 350 * 5) {
      angleMin = between(angleMins[1],angleMins[2],milli - 350 * 5,650 * 5);
      type = 0;
      stroke(150, 100, 255);
      drawBond(-side * sin(angleMin),side/2,type, false, 150, 100, 255);
    }
  }
  pop();
}

function drawSecWithout(mill,sec) {
  push();
  stroke(255, 100, 150);
  let secDir = ((sec % 5) -2) * 24 - 12;
  let angle = secDir + mill * 24/1000
  drawBond(-side * sin(angle),side/2,aMpM, true, 255, 100, 150);
  pop();
}

function drawSecMinHr() {
  push();
  let sec = secon;
  stroke(255);
  rotate(Math.floor(sec/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  var d = new Date();
  var mill = d.getMilliseconds();
  if (aMpM == 0) {
    drawMethylMethyl(mill);
  }
  drawSecWithout(mill,sec);
  if (aMpM == 1) {
    drawMethylMethyl(mill);
  }
  pop();
}

function hydrogenHr(minu, type, milli, r, g, b) {
  push();
  stroke(r,g,b);
  let pos = minu % 5;
  let type1 = [1 - type, 1 - type, 1 - type, 2, type][pos];
  let type2 = [type, 2, 1 - type, 1 - type, 1 - type][pos];
  let angles1 = [[-32,32,40,60,20,20],[-20,20,40,60,32,32]][1 - type];
  let angles2 = [[-20,-60,-40,-32,32,32],[-32,-60,-40,-20,20,20]][1 - type];
  angle1 = between(angles1[pos],angles1[pos+1],milli,5000);
  angle2 = between(angles2[pos],angles2[pos+1],milli,5000);
  if (pos == 1 && milli > 0) {
    type2 = 1 - type;
  }
  if (pos == 3 && milli > 0) {
    type1 = type;
  }
  if (aMpM == 0) {
    let len1 = hydrogenLess*side * sin(angle1);
    let len2 = side * sin(angle2);
    let offset = 12.5;
    let k = offset/sqrt(len1*len1 + side*side/4);
    stroke(150, 255, 100);
    if (pos >= 3) {
      drawBond(len2, side/2, type2, false, 150, 255, 100);
    }
    stroke(r,g,b);
    drawBond(len1, hydrogenLess*side/2, type1, false, r, g, b);
    drawH(len1*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(minu/5)*30);
    stroke(150, 255, 100);
    if (pos < 3) {
      drawBond(len2, side/2, type2, false, 150, 255, 100);
    }
  }
  else {
    let len1 = hydrogenLess*side * sin(angle1);
    let len2 = side * sin(angle2);
    let offset = 12.5;
    stroke(150, 255, 100);
    if (pos < 3) {
      drawBond(len2, side/2, type2, false, 150, 255, 100);
    }
    stroke(r,g,b);
    drawBond(len1, hydrogenLess*side/2, type1, false, r, g, b);
    k = offset/sqrt(len1*len1 + side*side/4);
    drawH(len1*(1+k), hydrogenLess*side/2*(1+k),-Math.floor(minu/5)*30);
    stroke(150, 255, 100);
    if (pos >= 3) {
      drawBond(len2, side/2, type2, false, 150, 255, 100);
    }
  }
  pop();
}

function drawMinHr() {
  push();
  stroke(255);
  let minu = minut;
  var d = new Date();
  var milli = d.getMilliseconds();
  let mill = 0;
  if (secon > 54) {
    mill = (secon % 5) * 1000 + milli;
  }
  let dashWedgeLine = 0;
  if ((minu % 5 == 0 || minu % 5 == 4) && !(minu % 5 == 0 && mill > 0)) {
    dashWedgeLine = 2;
  }
  else {
    dashWedgeLine = aMpM;
  }
  rotate(Math.floor(minu/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  stroke(150, 100, 255);
  let angles = [[-60,-20,0,20,60,60],[-60,-32,0,32,60,60]][1 - aMpM]
  angle = between(angles[minu % 5],angles[(minu % 5)+1],mill,5000);
  if (aMpM == 1) {
    push();
    drawBond(-side * sin(angle),side/2,dashWedgeLine, true, 150, 100, 255);
    traverse(0,side,true);
    pop();
  }
  hydrogenHr(minu, aMpM, mill, 255, 255, 255);
  if (aMpM == 0) {
    drawBond(-side * sin(angle),side/2,dashWedgeLine, true, 150, 100, 255);
    traverse(0,side,true);
  }
  pop();
}

function drawSecHr() {
  push();
  let sec = secon;
  stroke(255);
  rotate(Math.floor(sec/5)*30);
  translate(side/2*(2+sqrt(3)),-side/2);
  rotate(-105);
  traverse(0,side,true);
  var d = new Date();
  var mill = d.getMilliseconds();
  if (aMpM == 0) {
    drawMethylH(mill, 150, 255, 100);
  }
  drawSecWith(mill,sec);
  if (aMpM == 1) {
    drawMethylH(mill, 150, 255, 100);
  }
  pop();
}

function value(indexes, lst) {
  let firstNum = [(12+indexes[lst[1]]-indexes[lst[0]]) % 12, (12+indexes[lst[0]]-indexes[lst[1]]) % 12]
  let firstMin = min(firstNum);
  let direction = firstNum.indexOf(firstMin);
  return 1000*firstMin+100*([(12+indexes[lst[2]]-indexes[lst[0]]) % 12,(12+indexes[lst[0]]-indexes[lst[2]]) % 12][direction])+(2-lst[0])*10+2-lst[1];
}

function name() {
  let hr = hou % 12;
  let sec = Math.floor(secon/5);
  let minu = Math.floor(minut/5);
  if (hr == sec && minu == sec) {
    return "tert-butylcyclododecahexaene";
  }
  if (hr == sec) {
    return "1-" + ["(R)","(S)"][aMpM] + "-sec-butyl-" + (min((12+hr - minu) % 12, (12-hr + minu) % 12)+1) + "-ethylcyclododecahexaene";
  }
  if (sec == minu) {
    return "1-" + ["(R)","(S)"][aMpM] + "-sec-butyl-" + (min((12+hr - minu) % 12, (12-hr + minu) % 12)+1) + "-methylcyclododecahexaene";
  }
  if (minu == hr) {
    return "1-" + ["(R)","(S)"][aMpM] + "-sec-butyl-" + (min((12+sec - minu) % 12, (12-sec + minu) % 12)+1) + "-propylcyclododecahexaene";
  }
  let indexes = [sec, hr, minu];
  let tries = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  let minimum = 100000;
  let order = [];
  for (let x = 0; x < 6; x++) {
    let newValue = value(indexes, tries[x])
    if (newValue < minimum) {
      minimum = newValue;
      order = tries[x];
    }
  }
  numbers = [0,0,0];
  let secondNum = [(12+indexes[order[1]]-indexes[order[0]]) % 12, (12+indexes[order[0]]-indexes[order[1]]) % 12]
  let secondMin = min(secondNum);
  let direction = secondNum.indexOf(secondMin);
  let thirdNum = [(12+indexes[order[2]]-indexes[order[0]]) % 12,(12+indexes[order[0]]-indexes[order[2]]) % 12][direction]+1;
  numbers[order[0]] = 1;
  numbers[order[1]] = secondMin + 1;
  numbers[order[2]] = thirdNum;
  return numbers[2]+"-ethyl-"+numbers[1]+"-methyl-"+numbers[0]+"-propylcyclododecahexaene";
}

function digital() {
  let str = name();
  if (str.indexOf("tert") != -1) {
    return("0:00")
  }
  let numbers = "";
  let colon = true;
  if (str.indexOf("S") != -1) {
    numbers = "S:"
    colon = false;
  }
  if (str.indexOf("R") != -1) {
    numbers = "R:"
    colon = false;
  }
  let order = []
  for (let x = 1; x < 13; x++) {
    if (str.indexOf(x) != -1) {
      order[str.indexOf(x)] = x;
    }
  }
  for (let x = 0; x < order.length; x++) {
    if (order[x] < 12) {
      numbers += order[x];
      if (colon) {
        numbers += ":";
        colon = false;
      }
    }
  }
  return(numbers);
}

function draw() {
  scale(0.78);
  background(0);
  translate(400, 400);
  stroke(255);
  rotate(-75);
  strokeWeight(2);
  secon = second();
  minut = minute();
  hou = hour();
  aMpM = Math.floor(hou/12);
  if (Math.floor(minut/5) == Math.floor(secon/5) && Math.floor(secon/5) == hou % 12) {
    drawSecMinHr();
  }
  else if (Math.floor(minut/5) == Math.floor(secon/5)) {
    drawSecMin();
    drawHour();
  }
  else if (Math.floor(minut/5) == hou % 12) {
    var d = new Date();
    var mill = d.getMilliseconds();
    drawMinHr();
    drawSecond(mill);
  }
  else if (Math.floor(secon/5) == hou % 12) {
    var d = new Date();
    var mill = d.getMilliseconds();
    drawSecHr();
    drawMinute(mill);
  }
  else {
    var d = new Date();
    var mill = d.getMilliseconds();
    drawSecond(mill);
    drawMinute(mill);
    drawHour();
  }
  drawBenzene();
  rotate(75);
  textAlign(CENTER, BOTTOM);
  textSize(40);
  noFill();
  text("CLOCKBENZENE",0,475);
  textSize(25);
  fill(255);
  text(name(),0,415);
  textAlign(CENTER, CENTER);
  textSize(60);
  noFill();
  text(digital(),0,0);
  line(-400,512,400,512);
  line(-400,517,400,517);
  line(-400,522,400,522);
  strokeWeight(1);
  fill(255);
  textSize(15);
  textAlign(LEFT, BOTTOM);
  stroke(255, 100, 150);
  fill(255, 100, 150);
  text("The propyl group is the second hand. ",-387,550);
  stroke(255);
  fill(255);
  text("It advances every 5 seconds and rotates around the sigma bond to show",-387+textWidth("The propyl group is the second hand. "),550);
  text("smaller time intervals. ",-387,570);
  stroke(150, 100, 255);
  fill(150, 100, 255);
  text("The ethyl group is the minute hand. ", -387+textWidth("smaller time intervals. "),570);
  stroke(255);
  fill(255);
  text("Like the propyl group, it advances every 5 minutes and",-387+textWidth("smaller time intervals. The ethyl group is the minute hand. "),570);
  text("rotates around the the sigma bond to a new position every minute, again to show smaller time intervals (it doesn't",-387,590);
  text("begin this rotation until 5 seconds before the minute changes). ",-387,610);
  stroke(150, 255, 100);
  fill(150, 255, 100);
  text("The methyl group is the hour hand. ",-387+textWidth("begin this rotation until 5 seconds before the minute changes). "),610);
  stroke(255);
  fill(255);
  text("It advances every ", -387 + textWidth("begin this rotation until 5 seconds before the minute changes). The methyl group is the hour hand. "), 610);
  text("hour. When two hands collide, they form a sec-butyl group and the longer hand assumes the position of the longer ",-387,630);
  text("chain. When all three hands collide, they form a tert-butyl group. AM and PM are determined by which direction the ",-387,650);
  text("sigma bonds rotate. Clockwise (as seen from the center of the clock) designates AM; counterclockwise designates",-387,670);
  text("PM. AM versus PM also determines the chirality of the sec-butyl group when it appears in the molecule. AM ",-387,690);
  text("corresponds with an (R) chiral center; PM corresponds with an (S) chiral center. Standard IUPAC nomenclature rules ",-387,710);
  text("apply. The digital clock in the center gives a shorthand form of the IUPAC name that mimics the layout of a standard ",-387,730);
  text("digital clock, just as the clock itself mimics that of a standard analog clock.",-387,750);
}
