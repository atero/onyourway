module Api
  class MessagesController < ApplicationController

    def create
      @shipment = Shipment.where(:id => params[:shipment_id]).first
      @order = Order.where(:id => params[:order_id]).first
      @message = Message.new(message_params)
      # UserMailer.welcome_email(@shipment.user).deliver_later
      if @shipment then @message.shipment = @shipment end
      if @order then @message.order = @order end

      if (@message.sender == current_user || @message.recipient == current_user) && @message.save && @shipment
          # @messages = @shipment.messages
         render json: @message, status: :accepted
       else
         render json: {messsage:'Bad request'}, status: 400
      end
    end

    def index
      @shipment = Shipment.where(:id => params[:shipment_id]).first
      @order = Order.where(:id => params[:order_id]).first
      if @shipment then @messages = @shipment.messages else @messages = [] end
      if @messages.length > 0 && (@shipment.user == current_user || @order.user == current_user)
          render 'index'
       else
         render json: {messsage:'No messages found'}, status: 404
      end
    end

    private

    def message_params
      params.require(:message).permit(:text, :sender, :recipient)
    end
  end
end
