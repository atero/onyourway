class SessionsController < Devise::SessionsController
  def create
    build_resource
    resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in('user', resource)
      render json: { success: true, auth_token: resource.authentication_token, email: resource.email }
      return
    end
    invalid_login_attempt
end

end
