class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email(user)
    @user = user
    @url  = 'https://shopnship.herokuapp.com'
    mail(to: @user.email, subject: 'Welcome to OnYourWay')
  end
end
