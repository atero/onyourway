module Api
  class OrdersController < ApplicationController

    def create
      p params
      @order = Order.new(order_params)
      @order.user = current_user
      @order.photo = params[:file]

      if @order.save
          render json: @order, status: :accepted
       else
         render json: {messsage:'Unauthorized'}, status: 400
      end
    end

    private

    def order_params
      params.require(:order).permit(:photo, :from, :to, :date, :item)
    end

  end
end