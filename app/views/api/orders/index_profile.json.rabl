object @orders

attributes :id, :from, :to,:date,:item,:message,:price,:quantity,:reward,:total_price, :shipments, :user_id, :accepted_shipment

node :photo do |order|
      order.photo.url(:square)
end

child :shipments do |shipment|
      attributes :id, :from, :to, :date, :status, :messages

      child :user do |u|
		attributes :id, :first_name, :last_name
      end

      child :messages do |u|
		
		attributes :text, :sender_id
		
		child :sender do |u|
			attributes :id, :first_name, :last_name
      	end
      	
      end
end