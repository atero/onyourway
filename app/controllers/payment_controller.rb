class PaymentController < ApplicationController

  def create
      # Set your secret key: remember to change this to your live secret key in production
    # See your keys here https://dashboard.stripe.com/account/apikeys

    # Stripe.api_key = "sk_test_Foadiw9gjgVZ87JsXfOf2vhD"
    Stripe.api_key = "sk_live_OEmkzOULQhmnjPoOHKddTCcC"

    # Get the credit card details submitted by the form
    token = params[:stripeToken]
    name = params[:customer_name]
    order_id = params[:order_id]
    shipment_id = params[:shipment_id]
    total_to_pay = params[:total_to_pay]
    p "name~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    p name
    p order_id
    p shipment_id
    p 'To Pay:'

    # Create the charge on Stripe's servers - this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => total_to_pay.to_i * 100, # amount in cents, again
        :currency => "eur",
        :source => token,
        :description => "Example charge"
      )
    rescue Stripe::CardError => e
      # The card has been declined
    end

    @order = Order.where(id: order_id).first
    @shipment = Shipment.where(id: shipment_id).first
    @shoper =  User.where(id: @order.user_id).first
    @traveler = User.where(id: @shipment.user_id).first
    @order.accepted_shipment = shipment_id
    @shipment.status = "accepted-" + order_id
    @order.status = "accepted"
    @order.save
    @shipment.save
    @token = rand(100000 .. 999999)

    UserMailer.accepted_email(@traveler.email, @traveler.first_name, @shoper.first_name).deliver_later
    UserMailer.token_email(@shoper.email, @shoper.first_name, @traveler.first_name, @token).deliver_later

    redirect_to(:back)
  end
end
