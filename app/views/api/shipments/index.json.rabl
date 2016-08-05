object @shipments

attributes :id, :from, :to, :date,:item,:messages,:status

child :user do |u|
	attributes :id, :first_name, :last_name
end

child :order do |shipment|

      	attributes :id, :from, :to,:date,:item,:message,:price,:quantity,:reward,:total_price

      	child :user do |u|
			attributes :id, :first_name, :last_name
		end

	    node :photo do |order|
		     order.photo.url(:square)
		end

end
