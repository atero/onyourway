object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :user_id, :status, :accepted_shipment, :confirm_token, :created_at, :shipments

child :user do |_u|
  attributes :id, :first_name, :last_name, :provider, :photo_url
  _u.photo.url(:square)
end

node :photo do |order|
  order.photo.url(:square)
end
