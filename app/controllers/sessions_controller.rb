class SessionsController < Devise::SessionsController
  require 'aws-sdk-v1'
  require 'aws-sdk'
  include Mongoid::Paperclip

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource) do |format|
      resource[:photo_url] = resource.photo.url(:square)
      format.json { render json: resource } # this code will get executed for json request

    end
  end
end
