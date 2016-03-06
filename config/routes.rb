Rails.application.routes.draw do
      
  root  'static_pages#home'

      namespace :api ,  path: '/api' , defaults: {format: 'json'} do

          namespace :v1 do

          end

      end

end
