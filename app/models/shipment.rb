class Shipment
   include Mongoid::Document
   include Mongoid::Timestamps

   field :from, type: String
   field :to, type: String
   field :date, type: Date
   field :message, type: String
   ## RELATIONSHIPS
   belongs_to :user
   belongs_to :order
   ## METHODS

end
