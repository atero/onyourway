class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    save = @user.save
    p "**************************************************************"
    p @user
    p user_params
    p save
    p "**************************************************************"
    if save

    else
       
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
