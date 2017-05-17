module JWTWrapper
  extend self

  def encode(payload, expiration = nil)
    expiration ||= ENV['jwt_expiration_hours']

    payload = payload.dup
    payload['exp'] = expiration.to_i.hours.from_now.to_i

    JWT.encode payload, ENV['jwt_secret']
  end

  def decode(token)
    begin
      decoded_token = JWT.decode token, ENV['jwt_secret']

      decoded_token.first
    rescue
      nil
    end
  end
end
