$(function(){

var game = new Game();
var keys = [];    //to detect multiple keys
var bulletsArray = [];
var playerMovement = 10;
var player = $('#player');
var bullet = $('.bullet');
var bulletCount = 0;
//var enemeyPosition = $('.enemy').position();

var singleBullet = new Object()
  singleBullet.x =
  singleBullet.y =


//*ERROR, arrays not splicing & bullets not hiding*
//Bullet boundery = (enemy hit || max width) then remove from array & remove div.class
function bulletBoundery(){
  if (($('.bullet').position().left) >= 489 ){ //max width
    bulletsArray.splice(0,1);
    // $('.bullet').remove();
    $('div#amo:first-child').remove();
  }
}

//*Bullet still moves with #player horizonal axis*
function shoot(){
  var xPos = player.position().top;

  var bulletName = "bullet" + bulletCount;
  bulletCount++;

  $('div#amo').append('<div class="bullet" id="' + bulletName + '"></div>'); //insert bullet
  // $('div#' + bulletName).css({'top': xPos+25 + 'px'}).animate({left: '489px'}, 1500, ; //attach bullet to player position

  $('div#' + bulletName).on("change", function () {
    console.log("moved");
  });

  //attach bullet to player position
  $('div#' + bulletName).css({'top': xPos+25 + 'px'}).animate({left: '489px'}, {duration: 1500, done: function () {
    this.remove();
  }, step: function (){
    var bulletCords = $(this).offset()
    var enemies = $(".enemy")
    for (var i = 0; i < enemies.length; i++){
      var enemyCords = enemies.eq(i).offset();
      if ( bulletCords.left + 10 >= enemyCords.left       // 1 => leftside
        && bulletCords.top >= enemyCords.top              // 2 => topside
        && bulletCords.top + 10 <= enemyCords.top + 20){  // 3 => bottomside

        enemies.eq(i).remove();
        $('div#' + bulletName).remove();
      }
    }
  }});
}


function keysPressed(e) {
  // store an entry for every key pressed
  keys[e.keyCode] = true;

  if (keys[32]) { //spacebar
    shoot();
    e.preventDefault();
  }

  //inserted player top & bottom bounderies
  if (keys[38]) { //up arrow key
    if (player.position().top < 0)
      player.clearQueue();
    else {
      player.animate({top: '-=' + playerMovement}, 20);
      e.preventDefault();
    }
  }

  if (keys[40]) { //down arrow key
    if (player.position().top > 200)
      player.clearQueue();
    else {
      player.animate({top: '+=' + playerMovement}, 20);
      e.preventDefault();
    }
  }
  //console.log("keys array " + keys);
}

//once released, same keys in arrays become false.
function keysReleased(e) {
    keys[e.keyCode] = false;
}

//event listeners
$(document).keyup(keysReleased);
$(document).keydown(keysPressed);


}); //end of doc.ready