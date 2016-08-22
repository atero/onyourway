class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_mongoid_attached_file :photo, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  ## Database authenticatable
  field :email,              type: String, default: ''
  field :encrypted_password, type: String, default: ''
  field :first_name, type: String
  field :last_name, type: String
  field :base64_image, type: String
  field :country, type: Hash
  field :sex, type: String
  field :birthdate, type: Date

  #Payout
  field :paypal_email, type: String
  field :payout_name, type: String
  field :payout_iban, type: String
  field :payout_swift, type: String
  field :is_spa, type: Boolean
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

  ## STRIPE
  field :publishable_key,     type: String
  field :provider,            type: String
  field :uid,                 type: String
  field :access_code,         type: String

  has_many :orders
  has_many :shipments
  has_many :outgoings, class_name: 'Message', inverse_of: :sender
  has_many :ingoings, class_name: 'Message', inverse_of: :recepient
  ## Confirmable
  # field :confirmation_token,   type: String
  # field :confirmed_at,         type: Time
  # field :confirmation_sent_at, type: Time
  # field :unconfirmed_email,    type: String # Only if using reconfirmable

  ## Lockable
  # field :failed_attempts, type: Integer, default: 0 # Only if lock strategy is :failed_attempts
  # field :unlock_token,    type: String # Only if unlock strategy is :email or :both
  # field :locked_at,       type: Time
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates_uniqueness_of :email, case_sensitive: false
  before_save :process_base64_image

  def process_base64_image
    if base64_image && !base64_image.empty?
      regexp = /\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m
      data_uri_parts = base64_image.match(regexp) || []
      extension = MIME::Types[data_uri_parts[1]].first.preferred_extension
      file_name = SecureRandom.hex
      data = StringIO.new(Base64.decode64(data_uri_parts[2]))
      data.class.class_eval { attr_accessor :original_filename, :content_type }
      data.original_filename = file_name
      data.content_type = extension
      self.photo = data # self.image is a paperclip field
      self.base64_image = ''
    end
    true
  end
end
