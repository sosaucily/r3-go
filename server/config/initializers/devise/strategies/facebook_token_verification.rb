module Devise
  module Strategies
    class FacebookTokenVerification < Base
      def valid?
        params['grantType'].eql? 'facebook'
      end

      def authenticate!
        facebook_data = HTTParty.get("https://graph.facebook.com/debug_token",
          query: {
            input_token: params[:token],
            access_token: "#{ENV['FACEBOOK_KEY']}|#{ENV['FACEBOOK_SECRET']}"
          }
        ).parsed_response

        # Ensure this isn't a token hijack
        return fail! unless facebook_data.has_key? 'data' and
          facebook_data['data']['is_valid'] and
          facebook_data['data']['user_id'].eql? params[:userId]

        @user = User.find_by_fbUid(params[:userId]) # User has auth'd with FB before
        unless @user
          @user = User.find_by_email(params[:email])
          if @user # Merging FB auth to an account that already registered via email
            @user.update_with_fb_data(params)
          else # Create a new user account
            @user = create_user(params)
          end
        end
        return fail! unless @user

        success! @user
      end

      protected

      def create_user(params)
        User.create(User.scrub_params_from_fb(params))
      end

    end
  end
end
