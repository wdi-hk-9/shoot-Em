$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var bullets = [];
var playerMovement = 20;
var player = $('#player');
//var enemeyPosition = $('.enemy').position();

//*Bullet still moves with #player horizonal axis*
function shoot(){
  var xPos = player.position().top;

  //insert bullet
  $('div#box').append('<div class="bullet"></div>');

  //attach bullet to player position
  $('.bullet').css({'top': xPos+25 + 'px'}).animate({left: '500px'}, 1500);;

  //loop through bullets to push in array
  for (var i=1;i<=1;i++){ //testing
    bullets.push(i);
  }

  //console.log
  console.log("bullets array " + bullets);
}

//*I can't make it work* Bullet boundery = (enemy hit || max width) then remove from array.
function bulletBoundery(){
  if ($('.bullet').position().left >= 500 ){ //max width
    bullets.splice(0,1);
  }
}

//*I can't make it work* Trying to set it to the border limit
function boundery() {
  if (player.position().top >= 200){
    player.animate({top: '200px'});
  }
  if (player.position().top <= 0){
    player.animate({top: '10px'});
  };
}

//changed to if statement. easier for me to see.
function keysPressed(e) {
  // store an entry for every key pressed
  keys[e.keyCode] = true;

  //spacebar
  if (keys[32]) {
    shoot();
    e.preventDefault();
  }
  //up arrow key
  if (keys[38]) {
    player.animate({top: '-=' + playerMovement}, 100);
    e.preventDefault();
  }
  //down arrow key
  if (keys[40]) {
    player.animate({top: '+=' + playerMovement}, 100);
    e.preventDefault();
  }

  boundery();
  bulletBoundery();

  //console.log
  console.log("keys array " + keys);
}

//once released, same keys in arrays become false.
function keysReleased(e) {
    keys[e.keyCode] = false;
}

//event listeners
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready