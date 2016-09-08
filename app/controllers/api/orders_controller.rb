module Api
  class OrdersController < ApplicationController

    before_filter :authenticate_user!, :except => :index

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
      p '******************All Orders*************************'
      @orders = Order.where(:accepted_shipment => 'false')

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

    def update
      @order = Order.where(id: params[:order_id]).first
      if order_params.confirm_token && order_params.confirm_token == @order.accepted_token
        @order.status = 'delivered'
      end
      if @order && @order.update(order_params)

        p '999999999999999999999999999999999999999999'
        p order_params
        p '9999999999999999999999999999999999999999999'
        render json: @order, status: :accepted
      else
        render json: { messsage: 'No orders found' }, status: 404
      end
    end

    private

    def order_params
      params.require(:order).permit(:to, :date, :item, :message, :price, :reward, :total_price, :quantity, :photo, :base64_image, :from, :accepted_shipment, :status, :confirm_token)
    end
  end
end
