class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, :only => :create

  def create
    user = User.find_for_database_authentication(email: params[:email])
    return invalid_login_attempt unless user

    if user.valid_password?(params[:password])
      render json: { auth_token: JWTWrapper.encode({user_id: user.id}) }
      return
    end
    invalid_login_attempt
  end

  protected
  def invalid_login_attempt
    warden.custom_failure!
    render json: {error: t('invalid_login_attempt')}, status: 401
  end
end
