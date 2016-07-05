class User
  include Mongoid::Document
  include Mongoid::Timestamps
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :password, type: String, default: ""
  field :first_name , :type => String
  field :last_name , :type => String
  ## Recoverable
end
