var list_of_enemies_added = [];
var newEnemyCounter = 0;
var list_of_Enemies_removed = [];
var x = position().top

if (newEnemyCounter == 0){
  list_of_enemies_added.push({
      position: 'absolute',
      border: '2px solid black',
      backgroundColor: 'Red',
      height: '20px',
      width: '20px',
      left: '475px',
      top: game.randomEnemy(17, 190) + 'px'
  })
}
newEnemyCounter++;

if (newEnemyCounter == 30){
  newEnemyCounter == 0;
}

for (var i =0; i <= list_of_enemies_added.length; i++){
  var current = list_of_enemies_added[i];
  if (current.x > $('div#box').width()){
    list_of_Enemies_removed[i];
  } else {
    current.position().top +=5;
    $('div#box').append(htmlEnemy);
  };
}

for (var i in list_of_Enemies_removed){
  list_of_enemies_added.splice(i,1);
}

function addEnemy(){
  for (var i=0; i<enemyArray.length; i++){  //loop to add new enemy id
    enemyArray.push($('div#box').append(htmlBullet));
    $('.enemy').css({
        left: '475px',
        top: game.randomEnemy(17, 190) + 'px',
    });
    //$('.enemy').animate({left: '-450px'});
  }
}

setInterval(addEnemy, 2000);

/////////////////////////////////

function topBoundery(topLimit){
  if ($('#player').position().top <= topLimit){ //to have limit
    $('#player').css('top', '');       //remove style 'top' so it won't go up if keys are pressed
    setPosition = 0;                   //set the position back to stop incrementation (+=, -=)
  };
}

// Set bottom border boundery
function bottomBoundery(bottomLimit){
  if ($('#player').position().top > bottomLimit){
    setPosition = 200;
  };
}

/////////////////////////////////

//key code
switch(e.keyCode){
  case 38: //up arrow key
    setPosition -= 10;       //to go up
    $('#player').css({top: setPosition + 'px'}); //animate
    topBoundery(0);

    break;

  case 40: //down arrow key

    //setPosition += 10;       //to go down
       $('#player').animate({top: '20px'})
    //$('#player').css('top', setPosition + 'px');
    //bottomBoundery(200);
    break;

/////////////////////////////////

//makes it false
  $(document).keydown(function playerKeyMove(e){
  //var keyPress = true;
   switch(e.keyCode){
    case 38: //up arrow key
      $('#player').animate({top: '-=20px'}, 100);
      //if (!38){keyPress = false;}; //to stop keys from going on and on
      break;

    case 40: //down arrow key
      $('#player').animate({top: '+=20px'}, 100);
      //if (!40){keyPress = false;};
      break;

    case 32: //space bar
      shoot();
      break;
      // this needs to work even though 38 and 40 are pressed
    }
  }).keyup(function(e){ //end of keydown.

  })