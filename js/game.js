var Game = function() {
  //this.secondsLeft = timeLimit;
};

// Generate random numbers in an interval
Game.prototype.randomGen = function( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
};
