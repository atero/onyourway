class Message
   include Mongoid::Document
   include Mongoid::Timestamps

   field :text, type: String
   ## RELATIONSHIPS
   belongs_to :shipment
   belongs_to :sender, class_name: "User", inverse_of: :outgoing
   belongs_to :recipient, class_name: "User", inverse_of: :ingoing
   validate :users_consistency

  def users_consistency
    p self.shipment.order.last
    u1 = self.shipment.order.last.user
    u2 = self.shipment.user
    if !(u1 == self.sender && u2 == self.recipient || u2 == self.sender && u1 == self.recipient)
      errors.add(:message, "user is not supposed to be able to send this message")
    end
  end

end
