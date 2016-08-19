module Api
  class UsersController < ApplicationController

    def show
      @order = User.where(:id => params["id"]).first
      if @order
        @order.photo = @order.photo.url(:square)
        render json: @order, status: :accepted
       else
         render json: {messsage:'Not found'}, status: 404
      end
    end

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
      params.require(:user).permit(:email, :first_name, :last_name, :password, :country, :birthdate, :base64_image, :sex, :paypal_email, :payout_name, :payout_iban, :payout_swift, :is_spa)
    end
  end
end
