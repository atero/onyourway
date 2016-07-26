class UserMailer < ApplicationMailer
  default from: 'contact@onyourway.com'

  def welcome_email(user)

    p '************************{}}}}}}}}}}}}}**************************'

    @url = 'https://shopnship.herokuapp.com'
    mail(to: 'karen@aterostudio.com', subject: 'Welcome to OnYourWay', delivery_method_options: delivery_options)
  end
end
