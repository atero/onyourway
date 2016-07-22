object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :shipments, :user_id

node :photo do |order|
  #order.photo_file_name
  order.photo.url(:square)
end
