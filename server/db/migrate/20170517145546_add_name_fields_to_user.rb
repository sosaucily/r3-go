class AddNameFieldsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :lastName, :string
    add_column :users, :firstName, :string
    add_column :users, :fullName, :string
  end
end
