class User
  include Mongoid::Document
  include Mongoid::Timestamps
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""
  field :first_name , :type => String
  field :last_name , :type => String
  field :base64_image, type: String
  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  has_many :orders
  has_many :shipments
  has_many :outgoings, class_name: "Message", inverse_of: :sender
  has_many :ingoings, class_name: "Message", inverse_of: :recepient
  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time
  validates :first_name, :presence => true
  validates :last_name, :presence => true
  validates :email, :presence => true
  validates_uniqueness_of :email, :case_sensitive => false
  # before_save :process_base64_image
  #
  # def process_base64_image
  #
  #   if self.base64_image && self.base64_image.length > 0
  #
  #     regexp = /\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m
  #     data_uri_parts = self.base64_image.match(regexp) || []
  #     extension = MIME::Types[data_uri_parts[1]].first.preferred_extension
  #     file_name = SecureRandom.hex
  #     data = StringIO.new(Base64.decode64(data_uri_parts[2]))
  #     data.class.class_eval { attr_accessor :original_filename, :content_type }
  #     data.original_filename = file_name
  #     data.content_type = extension
  #     self.photo = data # self.image is a paperclip field
  #     self.base64_image = ""
  #
  #   end
  #   true
  # end

end
