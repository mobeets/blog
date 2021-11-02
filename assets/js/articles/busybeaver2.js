let xStart = 1;
let yStart = 1;
let machineIndex = 0;
let machineOrder = [];
let nMachines;
let squareSize = 40;
let curStep = 0;
let animateDuration = 500; // msec
let stepDuration = 1000; // msec
let finishedAnimating = false;
let timeOfLastStep;

let rowBuffer = 0;
let nSquaresPerRow = 15;
let lastPosition, curPosition, nextPosition;
let curRow = [];
let lastRow = [];
let nextRow = [];

let gridColor = '#f5f5f5'
let colorUnfilled = 'white';
let colorFilled = '#ffa600';
let curState;
let LEFT = -1, RIGHT = 1;
let STATE_1 = 0, STATE_2 = 1, HALT = 2;
let stateNames = ['"orange_obsessed"', '"optimistic"', 'HALT'];
let stateColors = [colorUnfilled, colorFilled];

let state1_input0 = [colorFilled, RIGHT, STATE_2];
let state1_input1 = [colorFilled, LEFT, STATE_2];
let state2_input0 = [colorFilled, LEFT, STATE_1];
let state2_input1 = [colorFilled, RIGHT, HALT];
let rules = [state1_input0, state1_input1, state2_input0, state2_input1];
let setRandomRules = false;
let pressedPlay = false;

function loadRuleByIndex(n) {
  let rule = [];

  let new_state = n % 3;
  n = floor(n/3);
  let action = 2*(n % 2) - 1;
  n = floor(n/2);
  let new_color = n % 2;
  return [stateColors[new_color], action, new_state];
}

function loadMachineByIndex(n) {
  let nPerRule = 4*2 + 4;
  let rules = [];
  for (var ruleIndex = 0; ruleIndex < 4; ruleIndex++) {
    let ruleNumber = n % nPerRule;
    rules.push(loadRuleByIndex(ruleNumber));
    n = floor(n / nPerRule);
  }
  return rules;
}

function loadRandomMachine() {
  setRandomRules = true;
  // rules = loadMachineByIndex(Math.round(random(-0.5, nMachines+0.5)));
  rules = loadMachineByIndex(machineOrder[machineIndex]);
  machineIndex++;
  initSimulator();
}

function setup() {
  let canvas = createCanvas(800, 200);
  canvas.parent('sketch-holder');
  // initSimulator();
  
  nMachines = Math.pow(4*2 + 4, 4);
  for (var i = 0; i < nMachines; i++) {
    machineOrder.push(i);
  }
  shuffle(machineOrder, true);

  $('.restart-sim').click(initSimulator);
  $('.random-sim').click(loadRandomMachine);
}

function initSimulator() {
  pressedPlay = true;
  timeOfLastStep = millis();
  curPosition = floor(nSquaresPerRow/2);
  nextPosition = curPosition;
  lastPosition = undefined;
  curStep = 0;
  curRow = initRow(curStep);
  curState = STATE_1;
  lastRow = [];
  nextRow = [];
}

function initRow(curStep) {
  let newRow = [];
  for (var j = 0; j < nSquaresPerRow; j++) {
    let newSquare = [xStart + j*squareSize, yStart + curStep*(squareSize+rowBuffer), colorUnfilled];
    newRow.push(newSquare);
  }
  return newRow;
}

function getRule(input) {
  if (curState == STATE_1) {
    if (input == colorUnfilled) {
      return rules[0]; // state1_input0;
    } else {
      return rules[1]; // state1_input1;
    }
  } else if (curState == STATE_2) {
    if (input == colorUnfilled) {
      return rules[2]; // state2_input0;
    } else {
      return rules[3]; // state2_input1;
    }
  }
}

function updateRowAndPosition(curStep) {
  if (lastPosition >= lastRow.length) { return; }
  let newRule = getRule(lastRow[lastPosition][2]);
  curState = newRule[2];
  
  let newRow = [];
  for (var j = 0; j < curRow.length; j++) {
    let newSquare = [xStart + j*squareSize, yStart + 0*curStep*(squareSize+rowBuffer), curRow[j][2]];    
    newRow.push(newSquare);
  }
  curRow = newRow;
  if (lastPosition >= curRow.length) { return; }
  curRow[lastPosition][2] = newRule[0];
  nextPosition = lastPosition + newRule[1];
}

function drawSquares(squares) {
  if (squares.length == 0) { return; }
  for (var j = 0; j < squares.length; j++) {
    fill(squares[j][2]);
    stroke(gridColor);
    strokeWeight(1);
    square(squares[j][0], squares[j][1], squareSize);
  }
}

function draw() {
  if (!pressedPlay) { return; }
  clear();
  let alphaTime = min(1, (millis() - timeOfLastStep)/animateDuration);
  if (curStep == 0) { alphaTime = 1; }
  
  if (curState != HALT) {
    if (millis() - timeOfLastStep > stepDuration) {
      
      timeOfLastStep = millis();
      curStep++;
      lastRow = curRow;
      lastPosition = nextPosition;
      updateRowAndPosition(curStep);
      finishedAnimating = false;
    }
  }
  
  // draw squares
  drawSquares(curRow);
  
  // highlight cursor
  fill('black');
  stroke('black');
  if (alphaTime < 1) {
     curPosition = (1-alphaTime)*lastPosition + alphaTime*nextPosition;
  }
  if (curPosition < nSquaresPerRow-1) {
    circle(curPosition*squareSize + squareSize/2, curRow[0][1] + squareSize/2, squareSize/3);
  }
  
  // update steps
  textSize(18);
  let stateName = stateNames[curState];
  if (setRandomRules && curState < 2) { stateName = curState; }
  text('Current state: ' + stateName, squareSize, 2*squareSize);
  text('Step count: ' + (curStep), squareSize, 3*squareSize);
}
