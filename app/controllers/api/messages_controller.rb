module Api
    class MessagesController < ApplicationController
        def create
            if (params[:shipment_id] != "0" && params[:order_id] != "0")
                @shipment = Shipment.where(id: params[:shipment_id]).first
                @order = Order.where(id: params[:order_id]).first
                @message = Message.new(message_params)
                @user = User.where(id: message_params['recipient']).first
                @message.shipment = @shipment if @shipment
                @message.order = @order if @order

                if (@message.sender == current_user || @message.recipient == current_user) && @message.save && @shipment
                    # @messages = @shipment.messages
                    UserMailer.message_email(@user.email, @user.first_name, message_params['text'], @order.user.first_name, @order.item).deliver_later
                    render json: @message, status: :accepted
                else
                    render json: { messsage: 'Bad request' }, status: 404
                end
          else
            UserMailer.contact_email('support@onyourway.io', message_params['sender_name'], message_params['text'], message_params['sender_email']).deliver_later
          end
        end


        def index
            @shipment = Shipment.where(id: params[:shipment_id]).first
            @order = Order.where(id: params[:order_id]).first
            @messages = @shipment.messages if @shipment
            @messages = @order ? @order.messages : []
            if !@messages.empty? && (@shipment.user == current_user || @order.user == current_user)
                render 'index'
            else
                render json: { messsage: 'No messages found' }, status: 404
            end
        end

        private

        def message_params
            params.require(:message).permit(:text, :sender, :recipient, :sender_email, :sender_name )
        end
    end
end
