class ActivateController < ApplicationController
  def activate
    @activatinCode = params[:code]
    @userToActivate = User.where(active: @activatinCode).first
    @userToActivate.active = "active"

    if @userToActivate.save
      redirect_to("/#/profile")
    end
  end
end
