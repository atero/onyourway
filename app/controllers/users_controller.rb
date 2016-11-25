class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
    string = (0...50).map { o[rand(o.length)] }.join
    @user.active = string
    p '**************************************************************'
    p @user
    p user_params
    p '**************************************************************'
    if @user.save
      UserMailer.welcome_email(@user.email, @user.first_name, @user.active).deliver_later
      render json: @user, status: :accepted
    else
      render json: { messsage: 'Bad request' }, status: 400
    end
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
