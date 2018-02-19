const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerWidth * 2 / 3;

const game = new Game(canvas);
game.start();
