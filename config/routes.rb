Rails.application.routes.draw do

  root  'static_pages#home'
  devise_for :users

      namespace :api ,  path: '/api' , defaults: {format: 'json'} do
        match '/orders', to: 'orders#show', via: [:options]
        post '/orders', to: 'orders#create'
        get '/orders', to: 'orders#index'
        get '/orders/:user_id', to: 'orders#list'
      end

end
