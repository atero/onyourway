module Api
  class ShipmentsController < ApplicationController

    before_filter :authenticate_user!

    def create
      @shipment = Shipment.new(shipment_params)
      @order = Order.where(:id => params["order_id"]).first
      @shipment.user = current_user
      @shipment.order = [@order]

      if @shipment.save
        puts "Saved!!!!!!"
          render json: @shipment, status: :accepted
       else
         puts "ERROR 400 !!!!!!"
         render json: {messsage:'Bad request'}, status: 400
      end
    end

    def list
      @shipments = current_user.shipments
      render 'index'
    end

    def update
      @shipment = Shipment.where(:id=> params[:shipment_id]).first
      if @shipment && @shipment.update(shipment_params)
        @shipment.order.save
        render json: @shipment, status: :accepted
      else
        render json: {messsage:'No orders found'}, status: 404
      end
    end

    # def list
    #   @orders = current_user.orders
    #   @shipments = @orders.map(&:shipments)
    #   if @shipments.length > 0
    #       render 'index'
    #    else
    #      render json: {messsage:'No orders found'}, status: 404
    #   end
    # end

    private

    def shipment_params
      params.require(:shipment).permit(:to, :date, :from, :status)
    end
  end
end
