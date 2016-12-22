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
      @orders = Order.where(:accepted_shipment => 'false').sort_by { |obj| obj.created_at }.reverse!

      if @orders.length > 0
          render 'index'
       else
         render json: {messsage:'No orders found'}, status: 404
      end
    end

    def list #created by the logged user
      @orders = current_user.orders.sort_by { |obj| obj.created_at }.reverse!
      if @orders.length > 0
          render 'index_profile'
       else
         render json: {messsage:'No orders found'}, status: 404
      end
    end

    def update
      @order = Order.where(id: params[:order_id]).first
      if order_params_tok['confirm_token'] && order_params_tok['confirm_token'] == @order.accepted_token
        shipment_id = @order.accepted_shipment
        @shipment = Shipment.where(id: shipment_id).first
        @ord_par = order_params_tok
        @ord_par['status'] = 'delivered'
        UserMailer.confirm_email(@shipment.user.email, @shipment.user.first_name, @order.user.first_name, @order.item ).deliver_later
      end
      if order_params_tok['confirm_token'] && order_params_tok['confirm_token'] != @order.accepted_token
        render json: { messsage: 'False token' } and return
      end

      if @order && @order.update(@ord_par)
        p '999999999999999999999999999999999999999999'
        p @ord_par
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

    def order_params_tok
      params.require(:order).permit(:to, :date, :item, :message, :price, :reward, :total_price, :quantity,  :from, :accepted_shipment, :status, :confirm_token)
    end
  end
end
