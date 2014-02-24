class User < ActiveRecord::Base
  has_many :games
  validates :user_name, uniqueness: true
  # Remember to create a migration!
end
