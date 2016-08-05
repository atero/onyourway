module Api
  class ShipmentsController < ApplicationController
    before_filter :authenticate_user!

    def create
      @shipments = current_user.shipments

      @shipment = Shipment.new(shipment_params)

      @shipment.user = current_user

      if params[:order_id]
        @order = Order.where(id: params['order_id']).first
        @shipment.order = @order if @order
      end

      if @shipment.save
        render json: @shipment, status: :accepted
      else
        render json: { messsage: 'Bad request' }, status: 400
      end
    end

    def list
      @shipments = current_user.shipments
      puts "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
      for @shpm in @shipments
        puts @shpm.from + " " + @shpm.to
      end
      render 'index'
    end

    def update
      @shipment = Shipment.where(id: params[:shipment_id]).first

      if @shipment && @shipment.update(shipment_params)
        @shipment.order.save
        render json: @shipment, status: :accepted
      else
        render json: { messsage: 'No orders found' }, status: 404
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
