class User < ActiveRecord::Base
  validates :user_name, uniqueness: true

  def games
    Game.where('winner = ? or loser = ?', self.id, self.id)
  end

  def won_games
    Game.where(winner: self.id)
  end

  def lost_games
    Game.where(loser: self.id)
  end
end
