Rails.application.routes.draw do

  root  'static_pages#home'
  devise_for :users
  post '/users/sign_up.json', to: 'users#create'
  
      namespace :api ,  path: '/api' , defaults: {format: 'json'} do
        match '/orders', to: 'orders#show', via: [:options]
        post '/orders', to: 'orders#create'
        get '/orders', to: 'orders#index'
        get '/orders/:user_id', to: 'orders#list'
        match '/shipments', to: 'shipments#show', via: [:options]
        post '/shipments/:order_id', to: 'shipments#create'
        post '/shipments', to: 'shipments#create'
        get '/shipments', to: 'shipments#list'
      end

end
