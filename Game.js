class Game {
    constructor (canvas) {
	this.canvas = canvas;
	this.canvas.style.border = Game.CANVAS_BORDER + "px solid skyblue";
	this.canvas.x = canvas.getBoundingClientRect().x + Game.CANVAS_BORDER;
	this.canvas.y = canvas.getBoundingClientRect().y + Game.CANVAS_BORDER;
	this.ctx = canvas.getContext('2d');
	this.stageLevel = 1;
    }
    start() {
	this.loadStage();
	this.draw();
    }
    loadStage() {
	this.stage = new Stage(this.stageLevel, this.canvas);
	console.log("Stage Loaded");
	console.log(this.stage.board);
    }
    // 500x500 for every stage.
    draw() {
	this.stage.draw();
    }
}

Game.CANVAS_BORDER = 3;
