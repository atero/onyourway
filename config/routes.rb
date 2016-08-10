Rails.application.routes.draw do
  root 'static_pages#home'
  devise_for :users
  post '/users/sign_up.json', to: 'users#create'

  namespace :api, path: '/api', defaults: { format: 'json' } do
    match '/orders', to: 'orders#show', via: [:options]
    post '/orders', to: 'orders#create'
    get '/orders', to: 'orders#index'
    get '/orders/:user_id', to: 'orders#list'
    put '/orders/:order_id', to: 'orders#update'

    match '/shipments', to: 'shipments#show', via: [:options]
    post '/shipments/:order_id', to: 'shipments#create'
    post '/shipments', to: 'shipments#create'
    put '/shipments/:shipment_id', to: 'shipments#update'
    get '/shipments', to: 'shipments#list'

    match '/messages', to: 'messages#show', via: [:options]
    post '/messages/:shipment_id', to: 'messages#create'
    get '/messages/:shipment_id', to: 'messages#index'
  end
end
