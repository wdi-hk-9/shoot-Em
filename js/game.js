var Game = function(){
  //this.secondsLeft = timeLimit;

};

// Generate random numbers in an interval
Game.prototype.randomEnemy = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Game.prototype.toggleFx = function(){
  $.fx.off = $.fx.off;
  }

