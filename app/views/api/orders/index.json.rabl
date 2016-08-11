object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :shipments, :user_id, :status, :accepted_shipment

child :user do |_u|
  attributes :id, :first_name, :last_name, :provider
end

node :photo do |order|
  order.photo.url(:square)
end
