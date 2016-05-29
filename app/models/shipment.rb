class Shipment
   include Mongoid::Document
   include Mongoid::Timestamps

   field :from, type: String
   field :to, type: String
   field :date, type: Date
   
   ## RELATIONSHIPS
   belongs_to :user
   belongs_to :order
   has_many :messages
   ## METHODS

end
