class UserSerializer < ActiveModel::Serializer
  attributes :email, :user_signed_in

  def user_signed_in
    instance_options[:user_signed_in]
  end
end
