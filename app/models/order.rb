class Order
    require 'aws-sdk-v1'
    require 'aws-sdk'
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
  validates_attachment_content_type :photo, :content_type => /^image\/(jpg|jpeg|pjpeg|png|x-png|gif)$/, :message => 'file type is not allowed (only jpeg/png/gif images)'

   field :from, type: String
   field :to, type: String
   field :date, type: Date
   field :item, type: String
   field :message, type: String
   field :price, type: Float
   field :quantity, type: Float
   field :reward, type: Float
   field :total_price, type: Float
   field :base64_image, type: String
   field :status, type: String, :default => 'pending'
   field :accepted_shipment, type: String, :default => 'false'
   ## RELATIONSHIPS
   belongs_to :user
   has_and_belongs_to_many :shipments
   has_many :messages
   before_save :process_base64_image #, :check_status

      def process_base64_image

        if self.base64_image && self.base64_image.length > 0

          regexp = /\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m
          data_uri_parts = self.base64_image.match(regexp) || []
          extension = MIME::Types[data_uri_parts[1]].first.preferred_extension
          file_name = SecureRandom.hex
          data = StringIO.new(Base64.decode64(data_uri_parts[2]))
          data.class.class_eval { attr_accessor :original_filename, :content_type }
          data.original_filename = file_name
          data.content_type = extension
          self.photo = data # self.image is a paperclip field
          self.base64_image = ""

        end
        true
      end

      def check_status

        valid_states = ["pending_travel", "travel_accepted", "travel_failed"]
        if !valid_states.include?(self.status) then self.status = "pending_travel" end

        sh = self.shipments.detect{|sh| sh.status == "accepted"}

        if sh then
          self.accepted_shipment = true
        else
          self.accepted_shipment = false
        end

        true

      end

end
