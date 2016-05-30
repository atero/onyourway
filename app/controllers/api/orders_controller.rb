module Api
  class OrdersController < ApplicationController

    def create
      @order = Order.new(order_params)
      @order.user = current_user
      if @order.save
          render json: @order, status: :accepted
       else
         render json: {messsage:'Bad request'}, status: 400
      end
    end
    
    def show
      @order = Order.where(:id => params["id"]).first
      if @order
        @order.photo = @order.photo.url(:square)
        render json: @order, status: :accepted
       else
         render json: {messsage:'Not found'}, status: 404
      end
    end

    def index #all the orders
      @orders = Order.all
      if @orders.length > 0
          render 'index'
       else
         render json: {messsage:'No orders found'}, status: 404
      end
    end

    def list #created by the logged user
      @orders = current_user.orders
      if @orders.length > 0
          render 'index_profile'
       else
         render json: {messsage:'No orders found'}, status: 404
      end
    end

    private

    def order_params
      params.require(:order).permit(:to, :date, :item, :message, :price, :reward, :total_price, :quantity, :photo, :base64_image, :from => [])
    end
  end
end