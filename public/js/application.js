$(document).on('ready', function(){

  var Game = function(id, winner, loser, time){
    this.id = id
    this.winner = winner
    this.loser = loser
    this.time = time
  }

  var Player = function(name, id){
    this.user_name =  name
    this.id = id
  }


  var player1 = new Player();
  var player2 = new Player();
  var game = new Game();
  var winner = false;



  function advance_player(player){
    $(player).find('.active').removeClass('active').next('td').addClass('active');
    var val = $(player).find('.active');
    if(val.length === 0 && !winner) {
      winner = true;
      place_winner(player);
    }
  }

  function place_winner(winning_player){
    if (winning_player === "#player1_strip"){
      var vanquished = player2
      var victor = player1
    }
    else {var vanquished = player1; var victor = player2};

    var object = {round: game.id ,winner: victor.id ,loser: vanquished.id}
    var end_game = {winner: victor.id, loser: vanquished.id }
    $.post('/winner',object, function(response){

      $('#winner').html('<h1>Good Job ' + victor.user_name + ' you kicked the shit out of ' + vanquished.user_name + '!! It took you ' + response.time + ' seconds to finish this race!</h1>');
    },"json");
    $.get('/display_players', end_game, function(data){
      console.log(data);
      $('#winner').append(data);
    })
  }


  // function advance_poodle(){
  //   $('#player2_strip').find('.poodle').removeClass('poodle').next('td').addClass('poodle');
  //   var val = $('#player2_strip').find('.poodle');
  //   if(val.length === 0 && !winner) {
  //     winner = true;
  //   };
  // };

  // function advance_duck(){
  //   $('#player1_strip').find('.duck').removeClass('duck').next('td').addClass('duck');
  //   var val = $('#player1_strip').find('.duck');
  //   if(val.length === 0 && !winner) {
  //     winner = true;
  //     var object = {game: $('#game').val(),winner: $("#player1").val(),loser: $("#player2").val()};
  //     $.post('/winner',object,function(response){
  //       $('#winner').html('<h1> Duck won !!! Good Job ' + response.user_name + '!! It took you ' + response.time + ' seconds to finish this race!</h1>');
  //     },"json");
  //   }
  // };

  $(document).on('click', "#reset", function(){
    $('#player2_strip').find('.active').removeClass('active');
    $('#player1_strip').find('.active').removeClass('active');

    $('#player2_strip td').first().addClass('active');
    $('#player1_strip td').first().addClass('active');
  });

  var start_game = function(){
    $.get('/game',function(response){
      game.id = response;
    });
  }

  $(document).on('click', '#start', function(){
    document.getElementById('start').disabled = true
    start_game();
    duck_button();
    poodle_button();
    random_button();
    $(document).on('keyup',function(key){
      switch(key.which)
      {
      case 65:
        if (!winner) {advance_player("#player1_strip")};
        break;
      case 76:
        if (!winner) {advance_player("#player2_strip")};
        break;
      };
    });
  });

  var duck_button = function(){
    $(document).on('click', '#duck', function(){
      advance_player("#player1_strip");
    });
  }

  var poodle_button= function(){
    $(document).on('click','#poodle', function(){
      advance_player("#player2_strip");
    });
  };

  $("form").on('submit', function(e){
    e.preventDefault();
    var data = $(this).serialize()
    $.post("/", data,function(reply){
      player1.id = reply.player1_id
      player1.user_name = reply.player1_name
      player2.id = reply.player2_id
      player2.user_name = reply.player2_name
      $("body").html(reply.html);
    }, "json");
  })

  $(document).on('click', '#restarting', function(e){
    e.preventDefault();
    winner = false;
    var data = {player1: player1.user_name, player2: player2.user_name}
    console.log(data);
    $.post("/", data,function(reply){
      player1.id = reply.player1_id
      player1.user_name = reply.player1_name
      player2.id = reply.player2_id
      player2.user_name = reply.player2_name
      $("body").html(reply.html);
    }, "json");
  })

  var random_button = function(){
    $(document).on('click','#random',function(){
      var duck = Math.floor(Math.random() * 5) + 1;
      var poodle =  Math.floor(Math.random() * 5) + 1;
      for(var i = 0; i < duck; i += 1){
        advance_duck();
      };
      for(var i = 0; i < poodle; i += 1){
        advance_poodle();
      };
    });
  }
})
