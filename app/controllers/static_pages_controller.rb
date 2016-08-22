class StaticPagesController < ApplicationController

	def home
		@user = current_user
		p '1212122212121212121212221&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
		@user.photo = user.photo.url(:square)
		p @user.photo
	end

end
