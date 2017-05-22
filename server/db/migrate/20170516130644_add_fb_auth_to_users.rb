class AddFbAuthToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :fbAccessToken, :string
    add_column :users, :fbTokenExpTime, :datetime
    add_column :users, :fbUid, :string
    add_column :users, :fbAvatarUrl, :string
  end
end
