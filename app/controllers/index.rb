get '/' do
  # Look in app/views/index.erb
  erb :index
end


get '/poodle' do
  erb :poodle, layout: !request.xhr?
end

get '/duck' do
  erb :duck_won, layout: !request.xhr?
end

post '/' do
  @a =  User.create(user_name: params[:player1])
  @b = User.create(user_name: params[:player2])

  @a = User.find_by(user_name: params[:player1]) if !@a.id
  @b = User.find_by(user_name: params[:player2]) if !@b.id
  erb :game
end

get '/game' do
  @game = Game.create
  id = @game.id.to_s
  puts @game.id
  return id
end

post '/winner' do
  @game=Game.find(params[:game])
  @game.winner = params[:winner].to_i
  @game.loser = params[:loser].to_i
  @game.save
  @player = User.find(params[:winner])
  sleep(0.5)
  @game.time = @game.updated_at - @game.created_at
  @game.save
  {user_name: @player.user_name, time: @game.time}.to_json
end
