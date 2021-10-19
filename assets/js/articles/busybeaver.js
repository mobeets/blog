let xStart = 1;
let yStart = 1;
let squareSize = 20;
let nSteps = 10;
let curStep = 0;
let stepDuration = 2000; // msec
let timeOfLastStep;

let rowBuffer = 0;
let nSquaresPerRow = 10;
let rows = [];
let curRow = [];
let curPositions = [];
let curPosition;

let gridColor = '#f5f5f5'
let colorUnfilled = 'white';
let colorFilled = '#ffa600';
let LEFT = -1, RIGHT = 1;
let STATE_1 = 0, STATE_2 = 1, HALT = 2;

let state1_input0 = [colorFilled, RIGHT, STATE_2];
let state1_input1 = [colorFilled, LEFT, STATE_2];
let state2_input0 = [colorFilled, LEFT, STATE_1];
let state2_input1 = [colorFilled, RIGHT, HALT];
let rules = [[state1_input0, state1_input1], [state2_input0, state2_input1]];

let curState = STATE_1;

function setup() {
  timeOfLastStep = millis();
  let canvas = createCanvas(400, 200);
  canvas.parent('sketch-holder');
  // xStart = width/2;
  curPosition = floor(nSquaresPerRow/2);
  addNewRow(curStep);
}

function applyRule(rule) {
  curPosition += rule[1];  
  curState = rule[2];
  return rule[0];
}

function getRule(input) {
  if (curState == STATE_1) {
    if (input == colorUnfilled) {
      return rules[0][0]; // state1_input0;
    } else {
      return rules[0][1]; // state1_input1;
    }
  } else if (curState == STATE_2) {
    if (input == colorUnfilled) {
      return rules[1][0]; // state2_input0;
    } else {
      return rules[1][1]; // state2_input1;
    }
  }
}

function addNewRow(curStep) {
  let curPositionThisStep = curPosition;
  let newRow = [];
  for (var j = 0; j < nSquaresPerRow; j++) {
    let curFill = colorUnfilled;
    if (curStep > 0) {
      curFill = rows[curStep-1][j][2];
      if (j == curPositionThisStep) {
        curFill = applyRule(getRule(curFill));
      }
    }
    let newSquare = [xStart + j*squareSize, yStart + curStep*(squareSize+rowBuffer), curFill];
    newRow.push(newSquare);
  }
  rows.push(newRow);
  curPositions.push(curPosition);
}

function draw() {
  if (millis() - timeOfLastStep > stepDuration) {
    timeOfLastStep = millis();
    if (curState != HALT) {
      curStep++;
      addNewRow(curStep);
    }
  }
  
  // draw squares
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      fill(rows[i][j][2]);
      stroke(gridColor);
      strokeWeight(1);
      square(rows[i][j][0], rows[i][j][1], squareSize);
    }
    // highlight cursor
    fill('black');
    stroke('black');
    // strokeWeight(3);
    circle(rows[i][curPositions[i]][0] + squareSize/2, rows[i][curPositions[i]][1] + squareSize/2, squareSize/3);
  }
}
