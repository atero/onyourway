object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :shipments, :user_id, :accepted_shipment, :photo_file_name, :confirm_token, :status



child :shipments do |_shipment|
  attributes :id, :from, :to, :date, :status, :messages

  child :user do |_u|
    attributes :id, :first_name, :last_name, :photo_url
    _u.photo.url(:square)
  end

  child :messages do |_u|
    attributes :text, :sender_id, :order_id

    child :sender do |_u|
      attributes :id, :first_name, :last_name
      _u.photo.url(:square)
    end
  end
end
