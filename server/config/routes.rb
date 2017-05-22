Rails.application.routes.draw do
  devise_for :admins, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users,
    path: "",
    controllers: {
      sessions: "sessions",
      # registrations: "registrations"
    },
    path_names: {
      sign_in: 'v1/login',
      sign_out: 'v1/logout'
      # password: 'forgot',
      # confirmation: 'confirm',
      # unlock: 'unblock',
      # sign_up: 'register',
    }

  namespace :v1, defaults: { format: :json } do
    get 'user', to: 'users#current'
  end
end
