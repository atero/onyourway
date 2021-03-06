class UserMailer < ApplicationMailer

  default from: 'On Your Way <support@onyourway.io> '

  def welcome_email(email, name, activtion_code)
    @email = email
    @first_name = name
    @activtion_code = activtion_code
    p '************************{}}}}}}}}}}}}}**************************'

    @url = 'https://onyourway.io'
    mail(to: email, subject: 'Welcome to OnYourWay')
  end

  def message_email(email, name, txt, sender_name, item)
    @email = email
    @message_text = txt
    @first_name = name
    @sender_name = sender_name
    @item = item
    p '************************NEW MESSAGE**************************'

    @url = 'https://onyourway.io'
    mail(to: email, subject: 'New Message on OnYourWay')

  end

  def accepted_email(email, name, shoper_name)
    @email = email
    @first_name = name
    @shoper_name = shoper_name

    p '************************NEW MESSAGE - ACCEPTED**************************'

    @url = 'https://onyourway.io'
    mail(to: email, subject: 'OnYourWay - Travel accepted')

  end

  def token_email(email, name, traveler_name, token)
    @email = email
    @first_name = name
    @traveler_name = traveler_name
    @token = token

    p '************************NEW MESSAGE - GET YOUR TOKEN**************************'

    @url = 'https://onyourway.io'
    mail(to: email, subject: 'OnYourWay - Payment received')

  end

  def contact_email(email, name, txt, sender_email)
    @email = email
    @sender_email = sender_email
    @message_text = txt
    @first_name = name
    p '************************NEW Contact**************************'
    p sender_email
    @url = 'https://onyourway.io'
    mail(to: 'support@onyourway.io', subject: 'New Message from OnYourWay contact form')
  end

  def rejected_email(email, name, shoper_name, item)
    @email = email
    @first_name = name
    @shoper_name = shoper_name
    @item = item

    p '************************NEW MESSAGE - REJECTED**************************'

    @url = 'https://onyourway.io'
    mail(to: email, subject: 'OnYourWay - Offer declined')
  end

  def confirm_email(email, name, shoper_name, item, id, shipment_id)
    @email = email
    @first_name = name
    @shoper_name = shoper_name
    @order_id = id
    @item = item
    @shipment_id = shipment_id

    p '************************NEW MESSAGE - Confirm Token**************************'

    @url = 'https://onyourway.io'
    mail(to: 'support@onyourway.io', subject: 'OnYourWay - Confirm Token')
  end
end
