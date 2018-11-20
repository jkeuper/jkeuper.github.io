function GameOfLife(width, height) {
  this.width = width;
  this.height = height;
  this.grid = [];
}

GameOfLife.prototype.setCell = function(x, y, val = true) {
  x = (x + this.width) % this.width;  
  y = (y + this.height) % this.height;  

  this.grid[y*this.width + x] = val ? 1 : 0;
};

GameOfLife.prototype.getCell = function(x, y) {
  x = (x + this.width) % this.width;  
  y = (y + this.height) % this.height;  

  return this.grid[y*this.width + x] == 1;
};

GameOfLife.prototype.render = function(renderFunc) {
  var i;
  for (i=0; i<this.width*this.height; i++) {
    if (this.grid[i] == 1) {
      renderFunc(i%this.width, Math.floor(i/this.width));
    }
  }
};

GameOfLife.prototype.getAdjecentCount = function(i) {
  var result = 0;
  var x = i%this.width;
  var y = Math.floor(i/this.width);

  if (this.getCell(x-1, y-1))
    result++;
  if (this.getCell(x, y-1))
    result++;
  if (this.getCell(x+1, y-1))
    result++;

  if (this.getCell(x-1, y))
    result++;
  if (this.getCell(x+1, y))
    result++;

  if (this.getCell(x-1, y+1))
    result++;
  if (this.getCell(x, y+1))
    result++;
  if (this.getCell(x+1, y+1))
    result++;

  return result;
};

GameOfLife.prototype.nextStep = function() {
  var newGrid = [];
  var i;
  for (i=0; i<this.width*this.height; i++) {
    var adj = this.getAdjecentCount(i);
    if (this.grid[i] == 1) {
      if (adj >= 2 && adj < 4)
        newGrid[i] = 1;
    } else {
      if (adj == 3)
        newGrid[i] = 1;
    }
  }

  this.grid = newGrid;
};

GameOfLife.prototype.clear = function() {
  this.grid = [];
};

