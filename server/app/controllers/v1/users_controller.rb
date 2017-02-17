class V1::UsersController < ApplicationController

  # Sample endpoint to test authentication and devise helper functionality
  def index
    render json: User.all, user_signed_in: user_signed_in?
  end
end
