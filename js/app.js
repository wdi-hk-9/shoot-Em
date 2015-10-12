$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var playerMovement = 20;
var player = $('#player');
//var enemeyPosition = $('.enemy').position();

function shoot(){
  var xPos = player.position().top;
  $('div#box').append('<div class="bullet"></div>');  //insert bullet
  $('.bullet').css({'top': xPos+25 + 'px'}).animate({left: '490px'}, 1200); //attach bullet to player position

    //add: push to array to tract bullets
    //add: after spacebar, release player position so bullet keeps own position
    //add: if collides with enemy position OR goes out of the window, splice out of array. toggle off/disapear/hide
}

//bullet boundery
  // function bulletBoundery(){
  //   if ($('.bullet').left == 490 ){
  //     // remove from array (splice)
  //   }
  // }

//I can't make it work. trying to set it to the border limit
function boundery() {
  if (player.position().top >= 200){
    player.animate({top: ='200px'});
  }
  if (player.position().top <= 0){
    player.animate({top: ='10px'});
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
}

//once released, same keys in arrays become false.
function keysReleased(e) {
    keys[e.keyCode] = false;
}

//event listener
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);

}); //end of doc.ready