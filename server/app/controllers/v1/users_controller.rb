class V1::UsersController < ApplicationController
  def current
    render json: current_user, user_signed_in: user_signed_in?
  end
end
