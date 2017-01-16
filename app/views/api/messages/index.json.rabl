object @messages

attributes :id, :shipment, :order, :sender, :recipient, :text

child :user do |_u|
    attributes :id, :first_name, :last_name, :provider, :photo_url
    node :photo do |_u|
        _u.photo.url(:square)
    end
end
