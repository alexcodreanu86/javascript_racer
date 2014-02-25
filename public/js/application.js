$(document).on('ready', function(){

  var winner = false;
  function advance_duck(){
    $('#player1_strip').find('.duck').removeClass('duck').next('td').addClass('duck');
    var val = $('#player1_strip').find('.duck');
    if(val.length === 0 && !winner) {
      winner = true;
      var object = {game: $('#game').val(),winner: $("#player1").val(),loser: $("#player2").val()};
      $.post('/winner',object,function(response){
        $('#winner').html('<h1> Duck won !!! Good Job ' + response.user_name + '!! It took you ' + response.time + ' seconds to finish this race!</h1>');
      },"json");
    }
  };

  function advance_poodle(){
    $('#player2_strip').find('.poodle').removeClass('poodle').next('td').addClass('poodle');
    var val = $('#player2_strip').find('.poodle');
    if(val.length === 0 && !winner) {
      winner = true;
      var object = {game: $('#game').val(),winner: $("#player2").val(),loser: $("#player1").val()}
      $.post('/winner',object, function(response){
        $('#winner').html('<h1> Poodle won !!! Good Job ' + response.user_name + '!! It took you ' + response.time + ' seconds to finish this race!</h1>');
      },"json");
    };
  };

  $("#reset").on('click', function(){
    $('#player2_strip').find('.poodle').removeClass('poodle');
    $('#player1_strip').find('.duck').removeClass('duck');

    $('#player2_strip td').first().addClass('poodle');
    $('#player1_strip td').first().addClass('duck');
  });

  var start_game = function(){
    $.get('/game',function(response){
      console.log(response);
      $('#game_space').html('<input type="hidden" id="game" value="'+ response +'">');
    });
  }

  $('#start').on('click',function(){
    start_game();
    duck_button();
    poodle_button();
    random_button();
    $(document).on('keyup',function(key){
      switch(key.which)
      {
      case 65:
        advance_duck();
        break;
      case 76:
        advance_poodle();
        break;
      };
    });
  });

  var duck_button = function(){
    $('#duck').on('click',function(){
      advance_duck();
    });
  }

  var poodle_button= function(){
    $('#poodle').on('click',function(){
      advance_poodle();
    });
  };

  var random_button = function(){
    $('#random').on('click',function(){
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
