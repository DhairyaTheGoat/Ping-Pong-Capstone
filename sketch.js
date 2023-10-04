// Define the paddles and ball
let leftPaddle;
let rightPaddle;
let ball;

// Players' scores
let leftScore = 0;
let rightScore = 0;

// Constants
const paddleWidth = 20;
const paddleHeight = 100;
const ballSize = 20;

function setup() {
  createCanvas(800, 600);
  
  // Create paddles and ball
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(220);
  
  // Draw paddles and ball
  leftPaddle.update();
  rightPaddle.update();
  ball.update();
  
  // Display scores
  displayScores();
}

function displayScores() {
  textSize(32);
  textAlign(CENTER);
  fill(0);
  text(`${leftScore} - ${rightScore}`, width / 2, 50);
}

// Paddle class definition
class Paddle {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.width = paddleWidth;
    this.height = paddleHeight;
    this.y = height / 2 - this.height / 2;
    this.x = isLeft ? 0 : width - this.width;
    this.speed = 8;
  }

  update() {
    // Move paddle based on input
    if (this.isLeft) {
      if (keyIsDown(87) && this.y > 0) {
        this.y -= this.speed;
      }
      if (keyIsDown(83) && this.y + this.height < height) {
        this.y += this.speed;
      }
    } else {
      if (keyIsDown(UP_ARROW) && this.y > 0) {
        this.y -= this.speed;
      }
      if (keyIsDown(DOWN_ARROW) && this.y + this.height < height) {
        this.y += this.speed;
      }
    }

    // Draw paddle
    fill(0);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}

// Ball class definition
class Ball {
  constructor() {
    this.size = ballSize;
    this.x = width / 2;
    this.y = height / 2;
    this.speedX = 5;
    this.speedY = 3;
  }

  update() {
    // Move the ball
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the top and bottom
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.speedY *= -1;
    }

    // Check collision with paddles
    if (
      (this.x - this.size / 2 < leftPaddle.x + leftPaddle.width &&
        this.y > leftPaddle.y &&
        this.y < leftPaddle.y + leftPaddle.height) ||
      (this.x + this.size / 2 > rightPaddle.x &&
        this.y > rightPaddle.y &&
        this.y < rightPaddle.y + rightPaddle.height)
    ) {
      this.speedX *= -1;
    }

    // Check for scoring
    if (this.x - this.size / 2 < 0) {
      // Right player scores
      rightScore++;
      this.reset();
    } else if (this.x + this.size / 2 > width) {
      // Left player scores
      leftScore++;
      this.reset();
    }

    // Draw ball
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  reset() {
    // Reset ball position
    this.x = width / 2;
    this.y = height / 2;
  }
}


