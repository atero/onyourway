module Api
  class UsersController < ApplicationController
    def update
      @user = User.where(id: params[:user_id]).first

      if @user && @user.update(user_params)
        render json: @user, status: :accepted
      else
        render json: { messsage: 'No orders found' }, status: 404
      end
  end

    private

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name, :password)
    end
  end
end
