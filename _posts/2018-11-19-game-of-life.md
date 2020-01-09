---
title: 'Game of Life'
date: 2018-11-19 21:33
categories: other
tags: simulation fun excercise 
featured_image: '/images/posts/game-of-life.gif'
lead_text: "Conway's Game of Life in Javascript"
---

In 1970 the "Game of Life" was created by the British mathematician John Conway. 
A discrete mathematics model to mimic the behavior of living cells.

In this cellular automation, too much or too little living cells will reduce
the population of cells. The right amount of living cells will keep the process
of creating and destroying cells in balance, whilst generating facinating patterns.

I just had to create a quick and simple implementation of the Game of Life.
So I created a Javascript version which you can check out [here](/projects/game-of-life/). The implementation is straight forward, but a nice excercise anyway.

## The rules
The game utilizes a two-dimensional grid, containing "dead" and "living"
cells. The rules for each step in time are very simple:

  * Underpopulation: if a living cell is surrounded by less than two living cells, it dies.
  * Stasis: if a living cell is surrounded by two or three living cells, it survives.
  * Overpopulation: if a living cell is surrounded by more than three living cells, it dies.
  * Reproduction: if a dead cell is surrounded by exactly three cells, it becomes a live cell.

## Patterns
<img src="/images/posts/gospers_glider_gun.gif" alt="A single Gosper's glider gun creating 'gliders'" class="media pull-right img-thumbnail" />
The main reason that the Game of Life facinates so many people, is
that with such simple rules a life like process is simulated of e.g.
a bacterial colony. The game of Life can even simulate a [Turing machine](https://www.ics.uci.edu/~welling/teaching/271fall09/Turing-Machine-Life.pdf)

Wikipedia shows a nice image of a "gun" producing so-called "gliders".
This pattern was first discovered by Bill Gospar, when searching for 
infinitely growing patterns.

A "glider" has been proposed to be a logo for "hackers", as the Game 
of Life appeals to hackers, and especially the concept of the glider. 


## Implementation
The game logic is all contained in one class named "_GameOfLife_". This 
class stores the grid of cells as a simple one-dimensional array. Much
easier to create than a two-dimensional array. Fortunately not much
harder to use. The grid is so-called "infinite", which means that 
everything passing the right edge of the grid, continues from the
left edge and visa versa. This also applies to the top and bottom
edge.

```js
function GameOfLife(width, height) {
  this.width = width;
  this.height = height;
  this.grid = [];
}
```

Two methods to set and retrieve the state of a single cell.
A little wizardry to obtain the right X and Y value for an
infinite grid. For example "_x = -1_" will become "_width - 1_". 

```js
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
```

To calculate the next step, we have to iterate each cell in te grid. 
Check the amount of living adjecent cells a apply the rules.

```js
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
```

The "_getAdjecentCount_" checks each adjecent cell and return the number
of living cells.

```js
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
```

Now there remains not much more than rendering all cells and clearing
the grid... Of course this class is not responsible for rendering all
cells. It simply iterates all cells and calls the provided render 
implementation. (Perrhaps the name is not that brightly chosen...)

```js
GameOfLife.prototype.render = function(renderFunc) {
  var i;
  for (i=0; i<this.width*this.height; i++) {
    if (this.grid[i] == 1) {
      renderFunc(i%this.width, Math.floor(i/this.width));
    }
  }
};

GameOfLife.prototype.clear = function() {
  this.grid = [];
};
```

## Wrap up
That's it! A simple javascript implementation of the Game of Life.
The real rendering and controlling of the game class, is done by
in javascript contained in the HTML. A separate javascript file
contains two-dimensional arrays with predefined shapes. These can
be selected and inserted in the grid.

You can play with the result [here](/projects/game-of-life/). The
source can be found on [Github](https://github.com/jkeuper/GameOfLife).
