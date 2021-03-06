Rails.application.routes.draw do
  root 'static_pages#home'
  devise_for :users, :controllers => { sessions: 'sessions', :omniauth_callbacks => "omniauth_callbacks" }
  post '/users/sign_up.json', to: 'users#create'
  post '/payment', to: 'payment#create'
  get '/activate', to: 'activate#activate'
  get '/users/password/new', to: 'users#password'

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

    put '/users/:user_id', to: 'users#update'
  end
  get '*path' => 'static_pages#home'
end
