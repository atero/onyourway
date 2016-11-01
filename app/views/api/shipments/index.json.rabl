object @shipments

attributes :id, :from, :to, :date, :item, :messages, :status

child :user do |_u|
  attributes :id, :first_name, :last_name, :provider, :photo_url, :photo
  _u.photo.url(:square)
end

child :order do |order|
	puts ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
	puts order
  attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :status, :accepted_shipment, :confirm_token

  child :user do |_u|
    attributes :id, :first_name, :last_name, :photo_url, :photo
  end

  child :messages do |_u|
    attributes :text, :sender_id, :order_id

    child :sender do |_u|
      attributes :id, :first_name, :last_name
    end
  end

  node :photo do |order|
    order.photo.url(:square)
  end
end
