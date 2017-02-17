Rails.application.routes.draw do
  devise_for :users,
    path: "",
    controllers: {
      sessions: "sessions",
      # registrations: "registrations"
    },
    path_names: {
      sign_in: 'v1/login',
      # password: 'forgot',
      # confirmation: 'confirm',
      # unlock: 'unblock',
      # sign_up: 'register',
      # sign_out: 'signout'
    }

  namespace :v1, defaults: { format: :json } do
    resources :users, only: [:index]
  end
end
