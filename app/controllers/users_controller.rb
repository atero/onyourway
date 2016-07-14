class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    p "**************************************************************"
    p @user
    p user_params
    p "**************************************************************"
    respond_to do |format|
      if @user.save
        # Tell the UserMailer to send a welcome email after save
        UserMailer.welcome_email(@user).deliver_later

        format.html { redirect_to(@user, notice: 'User was successfully created.') }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: 'new' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
