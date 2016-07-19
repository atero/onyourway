class UserMailer < ApplicationMailer
  default from: 'contact@onyourway.com'

  def welcome_email(email)

    p '************************{}}}}}}}}}}}}}**************************'

    @url = 'https://shopnship.herokuapp.com'
    delivery_options = { user_name: 'contact@atero.solutions',
                         password: '[h1*ISxpVUp7',
                         address: 'mail.atero.solutions' }
    mail(to: email, subject: 'Welcome to OnYourWay', delivery_method_options: delivery_options)
  end
end
