object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :shipments, :user_id, :accepted_shipment, :photo_file_name, :confirm_token, :status, :created_at

child :shipments do |_shipment|
  attributes :id, :from, :to, :date, :status, :messages, :refuses
  child :user do |_u|
    attributes :id, :first_name, :last_name, :photo_url
    node :photo do |_u|
        _u.photo.url(:square)
    end
  end

  child :messages do |_u|
    attributes :text, :sender_id, :order_id, :created_at
    child :sender do |_u|
      attributes :id, :first_name, :last_name, :provider, :photo_url
      node :photo do |_u|
          _u.photo.url(:square)
      end
    end
  end
end
