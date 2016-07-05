class UsersController < ApplicationController

  def create

    @user = User.new(user_params)
    respond_to do |format|
      if @user.save
        format.html { render :index, notice: 'user was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end

  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end
end
