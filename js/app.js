$(function(){
var game = new Game();

//var positionPlayer = $('#player').position();
var xPosPlayer = $('#player').offset().top
var yPosPlayer = $('#player').offset().left

var enemeyPosition = $('.enemy').position();
var htmlBullet = '<div class="bullet"></div>';
var htmlEnemy = '<div id="enemy"></div>';


  function shoot(){
    $('div#fireArea').append(htmlBullet);
    $('.bullet').animate({left: '465px'}, 1200); //move bullet from left to right. max 440px
      //follow player
      //if collides with enemy position, toggle off/disapear/hide
  }


  $(document).keydown(function playerKeyMove(e){
   switch(e.keyCode){
    case 38: //up arrow key
      $('#player').animate({top: '-=20px'}, 200).dequeue();
      break;

    case 40: //down arrow key
      $('#player').animate({top: '+=20px'}, 200).dequeue();
      break;

    case 32: //space bar
      shoot();
      break;
      // this needs to work even though 38 and 40 are pressed
    }
  }).keyup(function(e){ //end of keydown.

  })

}); //end of doc.ready
