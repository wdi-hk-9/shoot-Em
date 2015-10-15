$( function() {

  var game = new Game();
  var keys = []; // to detect multiple keys
  var bulletName;

  var bulletCount = 0;
  var enemyCount = 0;
  var killCount = 0;
  var enemyPassCount = 0;

  var spawnSpeed = 800;
  var enemySpeed = 3000;
  var enemyInterval_set1;
  //setInterval(spawnEnemy, spawnSpeed);

  var player = $( '#player' );
  var mission = parseInt( $( 'span#mission' ).html() );
  var enemyLimitRandom = parseInt( $( 'span#enemyLimit' ).html() );

  var missionRandom;
  var enemyLimitRandom;

  //=== Start Setup ===

  $( '#winMessage' ).hide();
  $( '#looseMessage' ).hide();
  $( '#resetButton' ).hide();
  resetMission();

  function resetMission() {
    missionRandom = parseInt( game.randomGen( 15, 25 ) );
    parseInt( $( 'span#mission' ).html( missionRandom ) );

    enemyLimitRandom = parseInt( game.randomGen( missionRandom * 0.2, missionRandom * 0.2 ) );
    parseInt( $( 'span#enemyLimit' ).html( enemyLimitRandom ) );

  }

  //=== Enemy Spawn + Collision with "Home" ===

  function spawnEnemy() {
    var makeEnemeyPos = game.randomGen( 40, 210 );
    var enemyName = "enemy" + enemyCount;
    enemyCount++;

    $( 'div#spawn' ).append( '<div class="enemy" id="' + enemyName + '"><img id="pig" src="images/pig2.png"></div>' );
    $( 'div#' + enemyName ).css( {
      'top': makeEnemeyPos + 'px'
    } ).animate( {
      left: '53px'
    }, {
      duration: enemySpeed,
      done: function() {
        this.remove();
      },
      step: function() {
        var enemies = $( ".enemy" );
        for ( var i = 0; i < enemies.length; i++ ) { // loop through .enemy class
          var enemyCords = enemies.eq( i ).offset(); // gets individual position
          var homeCords = $( '#home' ).offset();

          if ( homeCords.left + 54 >= enemyCords.left && homeCords.top + 250 >= enemyCords.top && enemyCords.top + 40 >= homeCords.top ) {
            enemies.eq( i ).remove();
            enemyPassCount += 1;
            parseInt( $( 'span#enemyPass' ).html( enemyPassCount ) );
            gameOver();
          }
        }
      }
    } );
  }

  //=== Bullet Shoot + Collision Enemy ===

  function shoot() {
    var xPos = player.position().top;

    //create individual name for each bullet => bullet0, bullet1 etc..
    var bulletName = "bullet" + bulletCount;
    bulletCount++;

    //insert bullet
    $( 'div#amo' ).append( '<div class="bullet" id="' + bulletName + '"></div>' );

    //attach indivdual bullets to player position //1600
    $( 'div#' + bulletName ).css( {
      'top': xPos + 25 + 'px'
    } ).animate( {
      left: '489px'
    }, {
      duration: 1600,
      done: function() {
        this.remove(); //remove <div> it at the end of the animation (which is at the max width)
      },
      step: function() { //function to be called for EACH animated property
        var bulletCords = $( this ).offset(); //to get actual position on the screen
        var enemies = $( ".enemy" );
        for ( var i = 0; i < enemies.length; i++ ) { // loop through .enemy class
          var enemyCords = enemies.eq( i ).offset(); // gets individual position

          if ( bulletCords.left + 10 >= enemyCords.left + 5 && bulletCords.top + 10 >= enemyCords.top + 1 && enemyCords.top + 35 >= bulletCords.top ) {
            enemies.eq( i ).remove() // remove the .enemy elements to the one at the specified index
            $( 'div#' + bulletName ).fadeOut( 1000 ).remove(); // removes the div
            killCount += 1;
            parseInt( $( 'span#score' ).html( killCount ) );
            gameOver();
            speedUp();
          }
        }
      }
    } );
  }

  //=== Shooting delay ===

  var locked = false;
  var shootTimer;

  function shooting() {
    if ( !locked ) {
      shoot();
      locked = true; //locked, cannot shoot again
      shootTimer = setTimeout( unlock, 400 ); //cannot shoot for a certain time
    }

    function unlock() {
      locked = false; //to unlock
      clearTimeout( shootTimer ); //clear the time
    }
  }

  //=== Increase speed of enemy at certain point ===

  function speedUp() {
    if ( killCount >= 3 ) {
      clearInterval( enemyInterval_set1 );
      spawnSpeed -= 30;
      enemySpeed -= 90;
      enemyInterval_set1 = setInterval( spawnEnemy, spawnSpeed );
    }
  }

  //=== Player Controls + Movement ===

  function keysPressed( e ) {
    keys[ e.keyCode ] = true; // store an entry for every key pressed

    if ( keys[ 32 ] ) { //spacebar
      shooting();
      e.preventDefault();
    }

    //inserted player top & bottom bounderies
    if ( keys[ 38 ] ) { //up arrow key
      if ( player.position().top < 25 )
        player.clearQueue();
      else {
        player.animate( {
          top: '-=' + 10
        }, 20 );
        e.preventDefault();
      }
    }

    if ( keys[ 40 ] ) { //down arrow key
      if ( player.position().top > 195 )
        player.clearQueue();
      else {
        player.animate( {
          top: '+=' + 10
        }, 20 );
        e.preventDefault();
      }
    }
  }

  //once released, same keys in arrays become false.
  function keysReleased( e ) {
    keys[ e.keyCode ] = false;
  }

  //=== Game Over settings ===

  function gameOver() {
    if ( killCount >= missionRandom ) {
      clearAll();
      $( '#box' ).fadeOut( 2000, function() {
        $( '#box' ).hide();
        $( '#winMessage' ).show();
        $( '#resetButton' ).show();
      } );
    }

    if ( enemyPassCount >= enemyLimitRandom ) {
      clearAll();
      clearInterval( enemyInterval_set1 );
      $( '#box' ).fadeOut( 2000, function() {
        $( '#box' ).hide();
        $( '#looseMessage' ).show();
        $( '#resetButton' ).show();
      } );
    }
  }

  //=== Clear Board ===

  function clearAll() {
    $( '.enemy' ).remove();
    clearInterval( enemyInterval_set1 ); //stop intervals
    //Counts
    bulletCount = 0;
    enemyCount = 0;
    killCount = 0;
    enemyPassCount = 0;
  }

  //=== Start Game ===
  function startGame() {
    clearInterval( enemyInterval_set1 );
    enemyInterval_set1 = setInterval( spawnEnemy, spawnSpeed );
    $( '#startButton' ).hide();
  };

  //=== Event Listeners ===
  $( '#resetButton' ).on( 'click', function() {
    clearAll();
    startGame();
    resetMission();
    $( '#box' ).show();
    $( '#winMessage' ).hide();
    $( '#looseMessage' ).hide();
    $( '#resetButton' ).hide();
    $( 'span#score' ).html( 0 );
    $( 'span#enemyPass' ).html( 0 );
  } );

  //Controlls event listeners
  $( '#startButton' ).on( 'click', startGame );
  $( document ).keyup( keysReleased );
  $( document ).keydown( keysPressed );

} ); //end of doc.ready
