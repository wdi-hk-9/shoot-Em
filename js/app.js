$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var playerMovement = 10;
var player = $('#player');
var bulletCount = 0;
var enemyCount = 0;

///////////////////////////////////////////////////////

function spawnEnemy(){
  var makeEnemeyPos = game.randomEnemy(15,230);
  var enemyName = "enemy" + enemyCount;
  enemyCount++;
  $('div#spawn').append('<div class="enemy" id="' + enemyName + '"></div>');
  $('div#' + enemyName).css({'top': makeEnemeyPos + 'px'}).animate({left: '56px'}, {duration: 10000, done: function(){
    this.remove();
  }});
}

function startSpawn() {
    setInterval(spawnEnemy, 1000);
}

///////////////////////////////////////////////////////

function shoot(){
  var xPos = player.position().top;

  //create individual name for each bullet => bullet0, bullet1 etc..
  var bulletName = "bullet" + bulletCount;
  bulletCount++;

  //insert bullet
  $('div#amo').append('<div class="bullet" id="' + bulletName + '"></div>');

  //attach indivdual bullets to player position
  $('div#' + bulletName).css({'top': xPos+25 + 'px'}).animate({left: '489px'}, {duration: 1500, done: function () {
    this.remove();                     //remove <div> it at the end of the animation (which is at the max width)

  }, step: function (){                //function to be called for EACH animated property
    var bulletCords = $(this).offset() //to get actual position on the screen
    var enemies = $(".enemy")
    for (var i = 0; i < enemies.length; i++){  // loop through .enemy class
      var enemyCords = enemies.eq(i).offset(); // gets individual position

      if ( bulletCords.left + 10 >= enemyCords.left + 5
        && bulletCords.top + 10 >= enemyCords.top
        && enemyCords.top + 20 >= bulletCords.top){

        enemies.eq(i).remove();          // remove the .enemy elements to the one at the specified index
        $('div#' + bulletName).remove(); // removes the div
      }

    }
  }});
}

///////////////////////////////////////////////////////
              /* INSERT SCORE FUNCTION */

//make SCORING
//if (enemies.eq(i).remove() = true){
    // score++
    //parseInt($('span#score').html()) = score
//}

///////////////////////////////////////////////////////


///////////////////////////////////////////////////////

          /* INSERT GAME OVER FUNCTION */

///////////////////////////////////////////////////////

function keysPressed(e) {
  keys[e.keyCode] = true; // store an entry for every key pressed

  if (keys[32]) { //spacebar
    shoot();
    e.preventDefault();
  }

  //inserted player top & bottom bounderies
  if (keys[38]) { //up arrow key
    if (player.position().top < 0)
      player.clearQueue();
    else {
      player.animate({top: '-=' + playerMovement}, 5);
      e.preventDefault();
    }
  }

  if (keys[40]) { //down arrow key
    if (player.position().top > 200)
      player.clearQueue();
    else {
      player.animate({top: '+=' + playerMovement}, 5);
      e.preventDefault();
    }
  }
  //console.log("keys array " + keys);
}

//once released, same keys in arrays become false.
function keysReleased(e) {
    keys[e.keyCode] = false;
}

///////////////////////////////////////////////////////

//event listeners
$('#button').on('click', startSpawn);
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready