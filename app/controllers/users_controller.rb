class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    p '**************************************************************'
    p @user
    p user_params
    p '**************************************************************'
    if @user.save
      UserMailer.welcome_email(@user.email, @user.first_name).deliver_later
      render json: @user, status: :accepted
    else
      render json: { messsage: 'Bad request' }, status: 400
    end
  end

  def show
    @user = current_user
    p '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
    
  end

  # def update
  #   @user = User.where(id: params[:user_id]).first
  #
  #   if @user && @user.update(user_params)
  #     render json: @user, status: :accepted
  #   else
  #     render json: { messsage: 'No orders found' }, status: 404
  #   end
  # end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
