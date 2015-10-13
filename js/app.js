$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var playerMovement = 10;
var bulletCount = 0;
var enemyCount = 0;
var currentKill = 0;
var enemyPassCount = 0;
var interval;

var player = $('#player');

var mission = parseInt($('span#mission').html());
var enemyPass = parseInt($('span#enemyPass').html());
var enemyLimit = parseInt($('span#enemyLimit').html());

///////////////////////////////////////////////////////


function spawnEnemy(){
  var makeEnemeyPos = game.randomEnemy(15,230);
  var enemyName = "enemy" + enemyCount;
  enemyCount++;
  $('div#spawn').append('<div class="enemy" id="' + enemyName + '"></div>');
  $('div#' + enemyName).css({'top': makeEnemeyPos + 'px'}).animate({left: '56px'}, {duration: 5000, done: function(){
    this.remove();
  }});
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

        currentKill += 1;
        parseInt($('span#score').html(currentKill));
      }

      gameOver();
  }}});
}

///////////////////////////////////////////////////////

function keysPressed(e) {
  keys[e.keyCode] = true; // store an entry for every key pressed

  if (keys[32]) { //spacebar
    shoot();

    //**THIS GOES FASTER SINCE IT'S ALWAYS PRESSED, put it somewhere else**
    interval = setInterval(spawnEnemy, 3000); //3000
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

// **NOT DONE: need to do htmlLoose condition**
function gameOver(){

  var htmlWIN = '';
    htmlWIN += '<div id="winMessage"><h3>Congratulation! Mission Complete. You killed: ';
    htmlWIN += currentKill;
    htmlWIN += ' number of enemies</h3></div>';

  var htmlLOOSE = '';
    htmlLOOSE +=  '<div id="looseMessage"><h3>GAME OVER! Mission incomplete! You killed: ';
    htmlLOOSE +=  currentKill;
    htmlLOOSE +=  ' number of enemies</h3></div>';

  if (currentKill == mission){
    $('#box').replaceWith(htmlWIN);
  }
}

function resetBox(){
  clearInterval(interval); //stops interval;
  $('.enemy').remove(); //clears the divs
  $('#box').replaceWith('#box'); // **ERROR: Can't get back to original screen
  bulletCount = 0;
  enemyCount = 0;
  currentKill = 0;
  enemyPassCount = 0;
  enemyPass = 0;
  $('span#score').html(0);
  $('span#enemyPass').html(0);
}

///////////////////////////////////////////////////////

//event listeners
$('#button2').on('click', resetBox);
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready