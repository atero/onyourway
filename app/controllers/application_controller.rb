class ApplicationController < ActionController::Base
  UserMailer.welcome_email("karen@aterostudio.com").deliver_later
  protect_from_forgery with: :null_session
  skip_before_filter :verify_authenticity_token
  # before_filter :set_gzip_deflate_header
  respond_to :html, :json

  private

  # -----------------------------------------------------------------------------
  # CORS SUPPORT
  # -----------------------------------------------------------------------------

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = '1728000'
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Content-Type, Token'
      headers['Access-Control-Max-Age'] = '1728000'
      render text: '', content_type: 'text/plain'
    end
  end

  # -----------------------------------------------------------------------------
  # GENERIC AUTHENTIFICATION
  # -----------------------------------------------------------------------------
  def restrict_access
    unless restrict_access_by_params || restrict_access_by_header
      render json: { message: 'Invalid API Token' }, status: 401
      return
    end
  end

  def restrict_access_by_header
    authenticate_with_http_token do |token|
      @user = User.where(token: token).first
    end
    return true if @user
  end

  def restrict_access_by_params
    @user = User.where(token: params[:token]).first
    return true if @user
  end
  # -----------------------------------------------------------------------------
  # ADMIN AUTHENTIFICATION
  # -----------------------------------------------------------------------------

  def restrict_access_admin_manager
    unless restrict_access_admin_by_params || restrict_access_admin_by_header
      render json: { message: 'Invalid API Token - not an admin' }, status: 401
      return
    end
    nil
  end

  def restrict_access_admin_by_header
    authenticate_with_http_token do |token|
      @user = User.where(token: token).first
    end
    if @user
      return true if @user.role == 'admin' || @user.role == 'manager'
    else
      return false
    end
  end

  def restrict_access_admin_by_params
    @user = User.where(token: params[:token]).first
    if @user
      return true if @user.role == 'admin' || @user.role == 'manager'
    else
      return false
    end
  end
end
