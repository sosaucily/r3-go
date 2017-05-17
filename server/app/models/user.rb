class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true

  def avatarUrl
    fbAvatarUrl
  end

  def update_with_fb_data(params)
    scrubbed_params = User.scrub_params_from_fb(params)
    params_to_update = scrubbed_params.select {|k,_| self[k].nil? }
    self.update(params_to_update)
  end

  def self.scrub_params_from_fb(params)
    { fbUid: params[:userId],
      fbTokenExpTime: (Time.now + params[:expiresIn].to_i),
      fullName: params[:name],
      firstName: params[:first_name],
      lastName: params[:last_name],
      fbAccessToken: params[:token],
      fbAvatarUrl: params[:picture][:data][:url],
      email: params[:email] }
  end
end
