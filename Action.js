class Action {
    constructor(type, ctx, x, y, w, h) {
	this.type = type;
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.activated = false;
	
	switch(this.type) {
	case "R":
            this.typeSymbol = "👉"; break;
	case "F":
            this.typeSymbol = "👆"; break;
	case "L":
            this.typeSymbol = "👈"; break;
	case "B":
            this.typeSymbol = "👇"; break;
            
            
	}
    }
    
    draw() {
  	let ctx = this.ctx;
  	ctx.beginPath();
  	ctx.fillStyle = Action.BGCOLOR;
  	if (this.activated) {
  	    ctx.fillStyle = Action.BGACTIVATEDCOLOR;
  	}
  	CanvasHelper.fillRect(
  	    ctx,
  	    this.x, this.y, this.w, this.h,
  	    Action.PADDING
  	);
  	
  	let fontSize = 30;
  	
  	ctx.fillStyle = Action.TEXT_COLOR;
  	ctx.font = fontSize + "px serif";
  	ctx.fillText(this.typeSymbol, this.x + this.w / 3, this.y + this.h * 2 / 3);
    }
    
    onMousedown(x, y) { // x, y: coord of the mouse click
	console.log(x, y);
  	if (
  	    x > this.x && x < this.x + this.w &&
    		y > this.y && y < this.y + this.h
  	) {
  	    this.activated ? this.activated = false: this.activated = true;
	}
    }
    
    onMouseup() {
	this.activated = false;
    }
}

Action.PADDING = 5;
Action.BGCOLOR = "dodgerblue";
Action.BGACTIVATEDCOLOR = "green";
Action.TEXT_COLOR = "blue";
