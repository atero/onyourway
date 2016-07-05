class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    p "**************************************************************"
    p @user
    p user_params
    p "**************************************************************"
    if @user.save
        render json: @user, status: :accepted
    else
       render json: {messsage:'Bad request'}, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
