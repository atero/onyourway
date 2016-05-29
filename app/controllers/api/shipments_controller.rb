module Api
  class ShipmentsController < ApplicationController

    before_filter :authenticate_user!
    
    def create

      @shipment = Shipment.new(shipment_params)

      @shipment.user = current_user

      if params[:order_id]
        @order = Order.where(:id => params["order_id"]).first
        if @order then @shipment.order = @order end
      end

      if @shipment.save
          render json: @shipment, status: :accepted
       else
         render json: {messsage:'Bad request'}, status: 400
      end

    end
    
    def list
      @shipments = current_user.shipments
      
      if @shipments.length > 0
        render json: @shipments, status: :accepted
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
      params.require(:shipment).permit(:to, :date, :from)
    end
  end
end