$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var playerMovement = 10;
var bulletCount = 0;
var enemyCount = 0;
var currentKill = 0;
var enemyPassCount = 0;
var spawnSpeed = 2950; //2950
var enemyInterval;
var shootInterval;

var player = $('#player');

var mission = parseInt($('span#mission').html());
var enemyPass = parseInt($('span#enemyPass').html());
var enemyLimit = parseInt($('span#enemyLimit').html());

///////////////////////////////////////////////////////


function spawnEnemy(){
  var makeEnemeyPos = game.randomEnemy(15,210);
  var enemyName = "enemy" + enemyCount;
  enemyCount++;
  $('div#spawn').append('<div class="enemy" id="' + enemyName + '"><img id="pig" src="images/pig2.png"></div>');
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
      //////////////////

      //track removed items for enemy scoring

      //////////////////

  }, step: function (){                //function to be called for EACH animated property
    var bulletCords = $(this).offset(); //to get actual position on the screen
    var enemies = $(".enemy");
    for (var i = 0; i < enemies.length; i++){  // loop through .enemy class
      var enemyCords = enemies.eq(i).offset(); // gets individual position

      if ( bulletCords.left + 10 >= enemyCords.left + 10
        && bulletCords.top + 10 >= enemyCords.top
        && enemyCords.top + 40 >= bulletCords.top){

        enemies.eq(i).remove();          // remove the .enemy elements to the one at the specified index
        $('div#' + bulletName).remove(); // removes the div

        currentKill += 1;
        parseInt($('span#score').html(currentKill));

        //increase speed if reach certain kills
        if (currentKill == 5){
          enemyInterval = setInterval(spawnEnemy, spawnSpeed*0.8)
          console.log(enemyInterval)
        }
        if (currentKill == 10){
          enemyInterval = setInterval(spawnEnemy, spawnSpeed*0.8)
          console.log(enemyInterval)
        }
      }
      // else if (enemyCords.left ==80) {
      //   enemyPassCount+=1;
      //   parseInt($('span#enemyPass').html(enemyPassCount));
      //   console.log(enemyPassCount);
      // }
      gameOver();
  }}});
}

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
    if (player.position().top > 195)
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
    htmlWIN += '<div id="winMessage"><h3>Congratulation! Mission Complete!</h3>';
    htmlWIN += '<h4>You can now eat some bacon!</h4>'
    htmlWIN += '<img id="bacon" src="http://static1.squarespace.com/static/53f03dd1e4b027cf34f2fc4b/t/553d767fe4b0befb836bd64e/1430091392154/"></div>';

  var htmlLOOSE = '<div id="looseMessage"><h3>GAME OVER! Mission Failed!</h3></div>';

  //Add Message
  //ERROR: after click resart from this point, keys and bullets not tracking
  if (currentKill >= mission){
    $('#box').fadeOut(1000, function(){
      $('#box').replaceWith(htmlWIN);
    });
  }
}

function resetBox(){
  var divBox ='';
    divBox += '<div id="box"><div id="home">';
    divBox += '<span id="homeText">HOME</span>';
    divBox += '<div id="player"></div></div>';
    divBox += '<div id="amo"></div><div id="spawn"></div></div>';

  clearInterval(enemyInterval); //stops interval;
  $('.enemy').remove(); //clears the divs
  $('#winMessage').replaceWith(divBox);
  $('#htmlLOOSE').replaceWith(divBox);
  bulletCount = 0;
  enemyCount = 0;
  currentKill = 0;
  enemyPassCount = 0;
  enemyPass = 0;
  spawnSpeed = 2950;
  $('span#score').html(0);
  $('span#enemyPass').html(0);
  $('#startButton').html("Start AGAIN?").attr("disabled", false);
  $('#button2').attr("disabled", false);
}

///////////////////////////////////////////////////////

$('button').click(function(){
    $(this).attr("disabled","disabled");
});

//Start Button (event listeners)
$('#startButton').attr("disabled", false).on('click', function(){
  enemyInterval = setInterval(spawnEnemy, spawnSpeed);
  $('#startButton').html("Spawning... Shoot! Shoot!! Shoot!!!");
  $('#button2').on('click', resetBox).attr("disabled", false);
});

//event listeners

$('#button2').on('click', resetBox).attr("disabled", true);
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready