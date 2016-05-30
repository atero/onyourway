class Shipment
   include Mongoid::Document
   include Mongoid::Timestamps

   validates :from, :to, :date, :user, :order, :presence => true

   field :from, type: String
   field :to, type: String
   field :date, type: Date
   field :status, type: String
   ## RELATIONSHIPS
   belongs_to :user
   belongs_to :order
   has_many :messages
   ## METHODS
   before_save :check_status

      def check_status

        valid_states = ["pending", "accepted", "delivered"]
        if !valid_states.include?(self.status) then self.status = "pending" end

      end
end
