object @orders

attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :shipments, :user_id, :accepted_shipment, :photo_file_name, :confirm_token



child :shipments do |_shipment|
  attributes :id, :from, :to, :date, :status, :messages

  child :user do |_u|
    attributes :id, :first_name, :last_name
  end

  child :messages do |_u|
    attributes :text, :sender_id, :order_id

    child :sender do |_u|
      attributes :id, :first_name, :last_name
    end
  end
end
