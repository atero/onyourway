object @messages

attributes :id, :shipment, :order, :sender, :recipient, :text

child :messages do |message|
    attributes :text, :sender_id, :order_id
    child :sender do |_u|
        attributes :id, :first_name, :last_name, :provider, :photo_url
        node :photo do |_u|
            _u.photo.url(:square)
        end
    end
end
