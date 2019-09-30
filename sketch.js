var cols = 25;
var rows = 25;
var grid = new Array(cols);
var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

function removeFromArray(arr, elt) {
  for(var i=arr.length-1;i>=0;i--) {
    if(arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heurestic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  //var d = abs(a.i-b.i)+abs(a.j-b.j);
  return d;
}

function Spot(i, j) {
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.i = i;
  this.j = j;
  this.neighbours = [];
  this.previous = undefined;

  this.show = function(col) {
    fill(col);
    stroke(0);
    rect(this.i*w, this.j*h, w, h);
  }

  this.addNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;
    if(i<cols-1) {
      this.neighbours.push(grid[i+1][j]);
    }
    if(i>0) {
      this.neighbours.push(grid[i-1][j]);
    }
    if(j<rows-1) {
      this.neighbours.push(grid[i][j+1]);
    }
    if(j>0) {
      this.neighbours.push(grid[i][j-1]);
    }
    
  }
}

  

function setup() {
  // put setup code here
  createCanvas(500, 500);
  console.log('A*');

  w = width/cols;
  h = height/rows;

  for(var i=0;i<cols;i++) {
    grid[i] = new Array(rows);
  }

  for(var i=0;i<cols;i++) {
    for(var j=0;j<rows;j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  for(var i=0;i<cols;i++) {
    for(var j=0;j<rows;j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];
  openSet.push(start);
}

function draw() {
  // put drawing code here

  if(openSet.length > 0 ) {
    var winner = 0;
    for(var i=0;i<openSet.length;i++) {
      if(openSet[i].f<openSet[winner].f) {
        winner = i;
      }
    }
    var cur = openSet[winner];
    if(cur === end) {
      
      console.log('DONE...!');
    }
    
    removeFromArray(openSet, cur);
    closedSet.push(cur);

    var neighbours = cur.neighbours;
    for(var i=0;i<neighbours.length;i++) {
      var neighbour = neighbours[i];

      if(!closedSet.includes(neighbour)) {
        var tempG = cur.g+1;
        if(openSet.includes(neighbour)) {
          if(tempG<neighbour.g) {
            neighbour.g = tempG;
          }
        } else {
          neighbour.g = tempG;
          openSet.push(neighbour);
        }
      }
      neighbour.h = heurestic(neighbour, end);
      neighbour.f = neighbour.g + neighbour.h;
      neighbour.previous = cur;
    }
  }

  background(0);

  for(var i=0;i<cols;i++) {
    for(var j=0;j<rows;j++) {
      grid[i][j].show(color(255));
    }
  }

  for(var i=0;i<closedSet.length;i++) {
    closedSet[i].show(color(255, 0, 0));
  }

  for(var i=0;i<openSet.length;i++) {
    openSet[i].show(color(0, 255, 0));
  }
  
 
  for(var i=0;i<path.length;i++) {
    path[i].show(color(0, 0, 255));
  }
}