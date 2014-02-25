get '/' do
  # Look in app/views/index.erb
  session.clear
  erb :index
end


get '/poodle' do
  erb :poodle, layout: !request.xhr?
end

get '/duck' do
  erb :duck_won, layout: !request.xhr?
end

post '/' do
  session[:player1] ||= params[:player1]
  session[:player2] ||= params[:player2]
  @a =  User.create(user_name: session[:player1])
  @b = User.create(user_name: session[:player2])
  @a = User.find_by(user_name: session[:player1]) if !@a.id
  @b = User.find_by(user_name: session[:player2]) if !@b.id
  @data = {player1_name: @a.user_name, player1_id: @a.id, player2_name: @b.user_name, player2_id: @b.id, html_game: erb :game}.to_json
  return @data if request.xhr?
  erb :game
end

get '/game' do
  @game = Game.create
  id = @game.id.to_s
  puts @game.id
  return id
end

get '/display_players' do
  @winner = User.find('1')
  @loser = User.find(2)
  erb :previous_games
end

post '/winner' do
  @game=Game.find(params[:round])
  @game.winner = params[:winner].to_i
  @game.loser = params[:loser].to_i
  @game.save
  @player = User.find(params[:winner])
  sleep(0.5)
  @game.time = @game.updated_at - @game.created_at
  @game.save
  {user_name: @player.user_name, time: @game.time}.to_json
end
