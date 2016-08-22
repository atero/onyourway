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

end
