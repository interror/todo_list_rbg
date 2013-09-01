class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :status
      t.date :deadline
      t.integer :priority
      t.belongs_to :project

      t.timestamps
    end
  end
end
