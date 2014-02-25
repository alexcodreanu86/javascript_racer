class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :loser
      t.integer :winner
      t.float :time

      t.timestamps
    end
  end
end
