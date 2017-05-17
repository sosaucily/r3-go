require 'jwt_wrapper'

class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, :only => :create

  def create
    if params[:grantType].eql? 'facebook'
      @user = facebook
      return invalid_login_attempt unless @user
    elsif params[:grantType].eql? 'password'
      @user = User.find_for_database_authentication(email: params[:email])
      return invalid_login_attempt unless @user
      return invalid_login_attempt unless @user.valid_password?(params[:password])
    else
      return invalid_login_attempt
    end
    render json: { auth_token: JWTWrapper.encode({user_id: @user.id}) }
  end

  def destroy
    sign_out(resource_name)
  end

  protected
  def facebook
    warden.authenticate! :facebook
  end

  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: t('invalid_login_attempt')}, status: 401
  end
end
