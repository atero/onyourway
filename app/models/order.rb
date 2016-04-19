class Order
   include Mongoid::Document
   include Mongoid::Timestamps
   include Mongoid::Paperclip

   ## FIELDS
  # This method associates the attribute ":avatar" with a file attachment
  has_mongoid_attached_file :photo, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


   field :from, type: Array
   field :to, type: String
   field :date, type: Date
   field :item, type: String

   ## RELATIONSHIPS
   belongs_to :user

   ## METHODS

  # render only accessible campaigns for a given user

end
