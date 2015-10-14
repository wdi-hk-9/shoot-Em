$(function(){

var game = new Game();
var keys = [];    // to detect multiple keys
var bulletName;

var bulletCount = 0;
var enemyCount = 0;
var killCount = 0;
var enemyPassCount = 0;

var spawnSpeed = 1200; // 1100
var enemySpeed = 5400;

var player = $('#player');
var mission = parseInt($('span#mission').html());
var enemyLimit = parseInt($('span#enemyLimit').html());

//interval
var enemyInterval_set2;
var enemyInterval_set1;

///////////////////////////////////////////////////////

//starting screen
$('#winMessage').hide();
$('#looseMessage').hide();
resetMission();

///////////////////////////////////////////////////////

function resetMission(){
  var missionRandom = game.randomGen(15,30);
  parseInt($('span#mission').html(missionRandom));

  var enemyLimitRandom = Math.floor(game.randomGen(missionRandom*0.2 , missionRandom*0.2));
  parseInt($('span#enemyLimit').html(enemyLimitRandom));
}

///////////////////////////////////////////////////////
var bulletName = "bullet" + bulletCount;
bulletCount++;
var bulletCords = $('div#' + bulletName).offset(); // to get actual position on the screen

function collision(){
  var enemies = $(".enemy");

  for (var i = 0; i < enemies.length; i++){
    var enemyCords = enemies.eq(i).offset(); // gets individual position of enemy
    var homeCords = $('#home').offset();

  //Enemy hits #home right border
  if ( homeCords.left + 53 >= enemyCords.left
    && homeCords.top + 250 >= enemyCords.top
    && enemyCords.top + 40 >= homeCords.top){

      enemies.eq(i).remove();          // remove the .enemy elements one at a time to the specified index
      $('div#' + bulletName).remove(); // removes the div
      enemyPassCount +=1; // score
      parseInt($('span#enemyPass').html(enemyPassCount));
  }

  //Bullet hits Enemy
  // if ( bulletCords.left + 10 >= enemyCords.left + 10
  //   && bulletCords.top + 10 >= enemyCords.top
  //   && enemyCords.top + 40 >= bulletCords.top){

  //     enemies.eq(i).remove();          // remove the .enemy elements to the one at the specified index
  //     $('div#' + bulletName).remove(); // removes the div
  //     killCount += 1;
  //     parseInt($('span#score').html(killCount));
  //   }
  } //end of for loop
} //end of collision

///////////////////////////////////////////////////////

function shoot(){
  var xPos = player.position().top;

  //insert bullet
  $('div#amo').append('<div class="bullet" id="' + bulletName + '"></div>');

  //attach indivdual bullets to player position
  $('div#' + bulletName).css({'top': xPos+25 + 'px'}).animate({left: '484px'},{
    duration: 3000, done: function(){ //3000
      this.remove();   //remove <div> it at the end of the animation (which is at the max width)
    },step: function(){
      collision();
    }
  });
}

        //increase speed if reach certain kills
        // if (killCount == 5){
        //   setInterval(spawnEnemy, spawnSpeed-200);
        //   enemySpeed = enemySpeed - 200
        // }

      // gameOver();

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

function spawnEnemy(){
  //random positions
  var makeEnemeyPos = game.randomGen(40,210); //min and max height

  //create indiviual id's per enemy
  var enemyName = "enemy" + enemyCount;
  enemyCount++;

  //insert Enemy w/individual id's
  $('div#spawn').append('<div class="enemy" id="' + enemyName + '"><img id="pig" src="images/pig2.png"></div>');

  //make Enemy move
  $('div#' + enemyName).css({'top': makeEnemeyPos + 'px'}).animate({left: '53px'},{
    duration: enemySpeed, done: function(){//5400
      this.remove(); //remove Enemy after animation ends
    },step: function(){
        collision();
      }
  });
}

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
  if (killCount >= mission){
    console.log("Wow: Mission complete");
    // $('#box').fadeOut(1000, function(){
    //   $('#box').hide();
    //   $('#winMessage').show();

    //   $('.enemy').remove();
    // })
  // }
  }else if(enemyPassCount >= enemyLimit){
    console.log("Game over: Reached enemy limits");
    // $('#box').fadeOut(1000, function(){
    //   $('#box').hide();
    //   $('#looseMessage').show();
    //   $('.enemy').remove();
    // });
  }
}

///////////////////////////////////////////////////////

function clearAll(){
  $('.enemy').remove();
  resetMission();  //change Mission value
  clearInterval(enemyInterval_set1);  //stop intervals
  clearInterval(enemyInterval_set2);  //stop intervals
  spawnSpeed = 1100; //back to normal values
  enemySpeed = 5400;

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