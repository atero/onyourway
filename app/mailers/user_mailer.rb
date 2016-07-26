class UserMailer < ApplicationMailer
  default from: 'contact@onyourway.com'

  def welcome_email(email)

    p '************************{}}}}}}}}}}}}}**************************'
    @user = user
    @url = 'https://shopnship.herokuapp.com'
    mail(to: email, subject: 'Welcome to OnYourWay')
  end
end
