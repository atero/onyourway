object @shipments

attributes :id, :from, :to, :date, :item, :status

child :user do |_u|
    attributes :id, :first_name, :last_name, :provider, :photo_url
    node :photo do |_u|
        _u.photo.url(:square)
    end
end

child :messages do |message|
    attributes :text, :sender_id, :order_id
    child :sender do |_u|
        attributes :id, :first_name, :last_name, :provider, :photo_url
    end
end

child :order do |order|
    puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    puts order
    attributes :id, :from, :to, :date, :item, :message, :price, :quantity, :reward, :total_price, :status, :accepted_shipment, :confirm_token

    child :user do |_u|
        attributes :id, :first_name, :last_name, :provider, :photo_url
        node :photo do |_u|
            _u.photo.url(:square)
        end
    end
    node :photo do |order|
        order.photo.url(:square)
    end
end
