class UserMailer < ApplicationMailer
  default from: 'support@onyourway.io'

  def welcome_email(email, name)
    @email = email
    @first_name = name
    p '************************{}}}}}}}}}}}}}**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'Welcome to OnYourWay')
  end
end
