$(function(){

var game = new Game();
var keys = [];    // to detect multiple keys
var bulletName;

var bulletCount = 0;
var enemyCount = 0;
var killCount = 0;
var enemyPassCount = 0;

var spawnSpeed = 1000;
var enemySpeed = 5100;
var enemyInterval_set1;
//setInterval(spawnEnemy, spawnSpeed);

var player = $('#player');
var mission = parseInt($('span#mission').html());
var enemyLimitRandom = parseInt($('span#enemyLimit').html());

var missionRandom;
var enemyLimitRandom;

///////////////////////////////////////////////////////

//starting screen
$('#winMessage').hide();
$('#looseMessage').hide();
resetMission();

function resetMission(){
  missionRandom = parseInt(game.randomGen(15,30));
  parseInt($('span#mission').html(missionRandom));

  enemyLimitRandom = parseInt(game.randomGen(missionRandom*0.3,missionRandom*0.3));
  parseInt($('span#enemyLimit').html(enemyLimitRandom));

}

///////////////////////////////////////////////////////

function spawnEnemy(){
  var makeEnemeyPos = game.randomGen(40,210);
  var enemyName = "enemy" + enemyCount;
  enemyCount++;

  $('div#spawn').append('<div class="enemy" id="' + enemyName + '"><img id="pig" src="images/pig2.png"></div>');
  $('div#' + enemyName).css({'top': makeEnemeyPos + 'px'}).animate({left: '53px'},
      {duration: enemySpeed, done: function(){
        this.remove();
          }, step: function (){
            var enemies = $(".enemy");
            for (var i = 0; i < enemies.length; i++){  // loop through .enemy class
              var enemyCords = enemies.eq(i).offset(); // gets individual position
              var homeCords = $('#home').offset();

              if (homeCords.left + 53 >= enemyCords.left
                && homeCords.top + 250 >= enemyCords.top
                && enemyCords.top + 40 >= homeCords.top){

                  enemies.eq(i).remove();
                  enemyPassCount+=1;
                  parseInt($('span#enemyPass').html(enemyPassCount));

                gameOver();
                speedUp();
              }
            }
          }
      });
}

///////////////////////////////////////////////////////

function shoot(){
  var xPos = player.position().top;

  //create individual name for each bullet => bullet0, bullet1 etc..
  var bulletName = "bullet" + bulletCount;
  bulletCount++;

  //insert bullet
  $('div#amo').append('<div class="bullet" id="' + bulletName + '"></div>');

  //attach indivdual bullets to player position //1600
  $('div#' + bulletName).css({'top': xPos+25 + 'px'}).animate({left: '489px'},
    {duration: 1600, done: function(){
      this.remove();                     //remove <div> it at the end of the animation (which is at the max width)
        }, step: function (){                //function to be called for EACH animated property
          var bulletCords = $(this).offset(); //to get actual position on the screen
          var enemies = $(".enemy");
          for (var i = 0; i < enemies.length; i++){  // loop through .enemy class
            var enemyCords = enemies.eq(i).offset(); // gets individual position

            if ( bulletCords.left + 10 >= enemyCords.left + 5
              && bulletCords.top + 10 >= enemyCords.top
              && enemyCords.top + 40 >= bulletCords.top){

                enemies.eq(i).remove();          // remove the .enemy elements to the one at the specified index
                $('div#' + bulletName).remove(); // removes the div

                killCount += 1;
                parseInt($('span#score').html(killCount));

                gameOver();
                speedUp();
            }
          }
        }
    });
}

///////////////////////////////////////////////////////

var locked = false;
var shootTimer;

function shooting(){
  if (!locked){
    shoot();
    locked = true; //locked, cannot shoot again
    shootTimer = setTimeout(unlock, 400); //cannot shoot for a certain time
  }

  function unlock(){
    locked = false; //to unlock
    clearTimeout(shootTimer); //clear the time
  }
}

///////////////////////////////////////////////////////

//need to clear these intervals. Error when doing speedUp. Intervals keep going
function speedUp(){
  if (killCount >= 3){
    clearInterval(enemyInterval_set1);
    spawnSpeed -= 30
    enemyInterval_set1 = setInterval(spawnEnemy, spawnSpeed);
    enemySpeed -= 100

      console.log(enemyInterval_set1);
      console.log(spawnSpeed);
      console.log(enemySpeed);
  } else if (killCount >= missionRandom){
      clearInterval(enemyInterval_set1);
  }
}

    console.log(enemyInterval_set1);
    console.log(enemySpeed);
    console.log(spawnSpeed);

///////////////////////////////////////////////////////

function keysPressed(e) {
  keys[e.keyCode] = true; // store an entry for every key pressed

  if (keys[32]) { //spacebar
    shooting();
    e.preventDefault();
  }

  //inserted player top & bottom bounderies
  if (keys[38]) { //up arrow key
    if (player.position().top < 25)
      player.clearQueue();
    else {
      player.animate({top: '-=' + 20}, 20);
      e.preventDefault();
    }
  }

  if (keys[40]) { //down arrow key
    if (player.position().top > 195)
      player.clearQueue();
    else {
      player.animate({top: '+=' + 20}, 20);
      e.preventDefault();
    }
  }
}

//once released, same keys in arrays become false.
function keysReleased(e) {
    keys[e.keyCode] = false;
}

///////////////////////////////////////////////////////

function gameOver(){
  if (killCount >= missionRandom){
    clearInterval(enemyInterval_set1);
    console.log("win message");

    // $('#box').fadeOut(1000, function(){
    //   $('#box').hide();
    //   $('#winMessage').show();
    //   $('#startButton').html("Amazing!!!")
      clearAll();
    // });
  }

  if(enemyPassCount >= enemyLimitRandom){
    clearInterval(enemyInterval_set1);
    console.log("LOST message");
    // $('#box').fadeOut(1000, function(){
    //   $('#box').hide();
    //   $('#looseMessage').show();
    //   $('#startButton').html("Sadness...")
      clearAll();
    // });
  }
}

///////////////////////////////////////////////////////

function clearAll(){
  $('.enemy').remove();
  // resetMission();  //change Mission value
  clearInterval(enemyInterval_set1);  //stop intervals
  spawnSpeed = 1000; //back to normal values
  enemySpeed = 5100;

  //Counts
  bulletCount = 0;
  enemyCount = 0;
  killCount = 0;
  enemyPassCount = 0;

  //Scoring
  $('span#score').html(0);
  $('span#enemyPass').html(0);
}

///////////////////////////////////////////////////////

//Start Button (event listeners)
$('#startButton').on('click', function(){
  clearInterval(enemyInterval_set1);
  enemyInterval_set1 = setInterval(spawnEnemy, spawnSpeed);
  $('#startButton').html("Spawning...").attr("disabled", true); //disable start so can't be clicked again
});


$('#resetButton').on('click', function(){
  clearAll();
  //Messages
  $('#box').show();
  $('#winMessage').hide();
  $('#looseMessage').hide();
  $('#startButton').html("Start").attr("disabled", false); //enable so they can start game
});

//Controlls event listeners
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready