// 0 = water
// 1 - empty block
// 2 - monster
// 3 - box
// 4 - prize
// 5 - player

class Stage {
    constructor(stageLevel, canvas) {
	this.ctx = canvas.getContext('2d');
  	this.board = []; // 2-D board grid
  	this.actions = []; // 2-D actions
  	/* debugging */
	//  	this.ctx.beginPath();
	//  	this.ctx.fillRect(10, 10,dim.blockWidth / 4,dim.blockWidth / 4);
	
  	this.boardDim = {
  	    x: 10,
  	    y: canvas.height / 4 - 10,
  	    boardLength: 3 * canvas.height / 4,
  	    blockLength: 3 * canvas.height / 4 / Stage.STAGE_SIZE
  	};
  	this.actionsDim = {
  	    x: 0,
  	    y: 0,
  	    width: canvas.width,
  	    height: canvas.height * 0.15,
  	    blockWidth: canvas.width * 0.1,
  	    blockHeight: canvas.height * 0.1
  	};
  	this._initBoard(stageLevel);
  	
  	/* event */
  	canvas.addEventListener("mousedown", evt => {
  	    let x = evt.clientX - canvas.x; // clientX and clientY are from the upper lefthand corner of the screen
  	    let y = evt.clientY - canvas.y;
  	    this.actions.forEach(action => action.onMousedown(x, y));
  	});
  	
  	canvas.addEventListener("mouseup", evt => {
  	    this.actions.forEach(action => action.onMousedown());
  	})
  	this.draw = this.draw.bind(this);
    }

    draw() {
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	this._drawBoard();
	this._drawActions();
	requestAnimationFrame(this.draw);
    }
    
    _drawBoard() {
	let ctx = this.ctx;
	let board = this.board;
	let dim = this.boardDim;

	ctx.beginPath();
	ctx.strokeStyle = Stage.BOARD_LINE_COLOR;
	ctx.strokeRect(dim.x, dim.y, dim.boardLength, dim.boardLength);

	board.forEach((row, rn) => {
	    row.forEach((col, cn) => {
		let x = dim.x + cn * dim.blockLength;
		let y = dim.y + rn * dim.blockLength;
  		let type = col;
  		if (type === 0) {
  		    ctx.beginPath();
		    ctx.fillStyle = "blue";
	      	    ctx.fillRect(x, y, dim.blockLength, dim.blockLength);
		}
		else {
	            ctx.beginPath();
      		    ctx.fillStyle = "green";
      		    ctx.fillRect(x, y, dim.blockLength, dim.blockLength);
      		    if (type == 2) {
			ctx.fillStyle = "red"
			ctx.moveTo(x + dim.blockLength / 2, y + dim.blockLength / 4);
			ctx.lineTo(x + dim.blockLength / 4, y + dim.blockLength * 3 / 4);
			ctx.lineTo(x + dim.blockLength * 3 / 4, y + dim.blockLength * 3 / 4);
			ctx.closePath();
    			ctx.fill();
		    }
		    else if (type == 3) {
		        ctx.beginPath();
      			ctx.fillStyle = "saddlebrown";
      			ctx.fillRect(x + dim.blockLength / 4, y + dim.blockLength / 4, dim.blockLength / 2, dim.blockLength / 2);
      		    }
      		    else if (type == 4) {
      			ctx.beginPath();
      			ctx.fillStyle = "gold";
      			let rot = Math.PI / 2 * 3;
      			let step = Math.PI / 5;
      			let tempX = x + dim.blockLength / 2;
      			let tempY = y + dim.blockLength / 2;
      			ctx.moveTo(tempX, tempY - dim.blockLength / 4);
      			for (let i = 0; i < 5; i++) {
      			    tempX = x + dim.blockLength / 2 + Math.cos(rot) * dim.blockLength / 4;
      			    tempY = y + dim.blockLength / 2 + Math.sin(rot) * dim.blockLength / 4;
      			    ctx.lineTo(tempX, tempY);
      			    rot += step;
			    
      			    tempX = x + dim.blockLength / 2 + Math.cos(rot) * 10;
      			    tempY = y + dim.blockLength / 2 + Math.sin(rot) * 10;
      			    ctx.lineTo(tempX, tempY);
      			    rot += step;
      			}
      			ctx.lineTo(x + dim.blockLength / 2, y + dim.blockLength / 4);
      			ctx.closePath();
      			ctx.fill();
      		    }
      		    else if (type == 5) {
      			ctx.beginPath();
      			ctx.fillStyle = "purple";
      			ctx.arc(x + dim.blockLength / 2, y + dim.blockLength / 2, dim.blockLength / 4, 0, 2 * Math.PI);
      			ctx.fill();
      		    }
		}
		ctx.strokeRect(dim.x + cn * dim.blockLength, dim.y + rn * dim.blockLength, dim.blockLength, dim.blockLength);
	    })
	})
    }
    
    _drawActions() {
	let ctx = this.ctx;
	let actions = this.actions;
	let dim = this.actionsDim;
	
	ctx.beginPath() ;
	ctx.fillStyle = Stage.ACTIONS_BGCOLOR;
	ctx.fillRect(dim.x, dim.y, dim.width, dim.height);
	ctx.fillStyle = Action.TEXT_COLOR;
	let fontSize = 30;
  	ctx.font = fontSize + "px serif";
  	ctx.fillText("Available Actions", 5, 25);
	this.actions.forEach(a => a.draw());
    }
    
    _initBoard(stageLevel) {
	let board = new Array(Stage.STAGE_SIZE)
	    .fill(0)
	    .map(() => new Array(Stage.STAGE_SIZE).fill(0));
	let data = Stage.BOARD_DATA[stageLevel];
	data.blocks.forEach(b => {
	    board[b[0]][b[1]] = b[2];
	})
	
	this.board = board;
	this.actions = data.actions.map((type, i) => {
            let x = this.actionsDim.x + this.actionsDim.blockWidth * i; 
            let y = this.actionsDim.height / 3;
            return new Action(
		type,
		this.ctx,
		x,
		y,
		this.actionsDim.blockWidth,
		this.actionsDim.blockHeight);
	}); // TODO deep copy
	return board;
    }
}

Stage.STAGE_SIZE = 8;
Stage.BOARD_LINE_COLOR = "rgba(0, 0, 0, 0.1)";
Stage.CAPTION_TEXT_COLOR = "black";
Stage.ACTIONS_BGCOLOR = "lightgray";
Stage.BOARD_DATA = {
    1: {
	blocks: [
	    [3, 2, 4],
	    [3, 3, 1],
	    [4, 3, 5]
	],
	actions: ['L', 'F', 'B', 'R']
    }
};
