class Message
   include Mongoid::Document
   include Mongoid::Timestamps

   field :text, type: String
   ## RELATIONSHIPS
   belongs_to :shipment
   belongs_to :sender, class_name: "User", inverse_of: :outgoing
   belongs_to :recipient, class_name: "User", inverse_of: :ingoing

end
