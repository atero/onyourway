module Api
  class ShipmentsController < ApplicationController
    before_filter :authenticate_user!

    def create
      @ext = Shipment.where({to: shipment_params['to'], from: shipment_params['from'], date: shipment_params['date'], user: current_user}).first
      @order = Order.where(id: params['order_id']).first

      if @ext
        puts 'Exist!!!!!!!!!!!!!!!!!!'
        @shipment = @ext
        if params[:order_id] && params[:order_id] != "noid"
          puts params[:order_id] + '***************************************'
          @shipment.order.push(@order) if @order
          puts 'Order #################################'
          puts @shipment.order
          puts 'Order #################################'
          if @shipment.save
            if @order.has_attribute?(:shipment)
               @order.shipment.push(@shipment)
            else
              @order[:shipment] = [@shipment]
            end
            render json: @shipment, status: :accepted
          else
            render json: { messsage: 'Bad request' }, status: 400
          end
        end
      else
        @shipment = Shipment.new(shipment_params)
        @shipment.user = current_user
        if params[:order_id] && params[:order_id] != "noid"
          puts params[:order_id] + '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
          @shipment.order = [@order] if @order
          puts 'Order ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'
          puts @shipment.order
          if @shipment.save
            if @order.shipments
              @order.shipments.push(@shipment)
              puts 'Shipment ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'
            else
              @order[:shipment] = [@shipment]
              puts 'Shipment ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;'
            end
            @order.save!
            render json: @shipment, status: :accepted
          else
            render json: { messsage: 'Bad request' }, status: 400
          end
        else
          if @shipment.save
              render json: @shipment, status: :accepted
            else
              render json: { messsage: 'Bad request' }, status: 400
            end
        end
      end
    end

    def list
      @shipments = current_user.shipments.sort_by { |obj| obj.date}.reverse!
      render 'index'
    end

    def update
      @shipment = Shipment.where(id: params[:shipment_id]).first
      order_id = params[:order_id]
      @order = Order.where(id: order_id).first
      if @shipment && @shipment.update(shipment_params)
        p '8888888888888888888888888888888888888888'
        p shipment_params
        # @shipment.order.save
       if @shipment.has_attribute?(:refuses)
           UserMailer.rejected_email(@shipment.user.email, @shipment.user.first_name, @order.user.first_name, @order.item).deliver_later
         end
        render json: @shipment, status: :accepted
      else
        render json: { messsage: 'No orders found' }, status: 404
      end
    end

    private

    def shipment_params
      params.require(:shipment).permit(:to, :date, :from, :status, :refuses => [])
    end
  end
end
