class UserMailer < ApplicationMailer
  default from: 'contact@onyourway.com'

  def welcome_email(user)

    p '************************{}}}}}}}}}}}}}**************************'
    @user = user
    @url = 'https://shopnship.herokuapp.com'
    mail(to: 'karen@aterostudio.com', subject: 'Welcome to OnYourWay')
  end
end
