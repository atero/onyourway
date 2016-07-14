class UserMailer < ApplicationMailer
  default from: 'contact@onyourway.com'

  def welcome_email(user)
    @user = user
    p "************************{}}}}}}}}}}}}}**************************"
    p @user
    @url  = 'https://shopnship.herokuapp.com'
    mail(to: @user.email, subject: 'Welcome to OnYourWay')
  end
end
