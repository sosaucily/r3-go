class UserSerializer < ActiveModel::Serializer
  attributes :email, :user_signed_in, :last_sign_in_at, :last_sign_in_ip,
    :sign_in_count, :fbUid, :avatarUrl, :firstName, :lastName, :fullName,
    :fbTokenExpTime

  def user_signed_in
    instance_options[:user_signed_in]
  end
end
