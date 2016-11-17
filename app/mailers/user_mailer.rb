class UserMailer < ApplicationMailer

  default from: 'support@onyourway.io'

  def welcome_email(email, name)
    @email = email
    @first_name = name
    p '************************{}}}}}}}}}}}}}**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'Welcome to OnYourWay')
  end

  def message_email(email, name, txt)
    @email = email
    @message_text = txt
    @first_name = name
    p '************************NEW MESSAGE**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'New Message on OnYourWay')

  end

  def accepted_email(email, name, shoper_name)
    @email = email
    @first_name = name
    @shoper_name = shoper_name

    p '************************NEW MESSAGE - ACCEPTED**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'OnYourWay - Travel accepted')

  end

  def token_email(email, name, traveler_name, token)
    @email = email
    @first_name = name
    @traveler_name = traveler_name
    @token = token

    p '************************NEW MESSAGE - GET YOUR TOKEN**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'OnYourWay - Payment received')

  end

  def contact_email(email, name, txt, sender_email)
    @email = email
    @sender_email = sender_email
    @message_text = txt
    @first_name = name
    p '************************NEW Contact**************************'
    @url = 'https://shopnship.herokuapp.com'
    mail(to: 'karen@atero.solutions', subject: 'New Message from OnYourWay contact form')
  end

end
