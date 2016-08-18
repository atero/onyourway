object @users

attributes :id, :from, :to, :date, :item, :messages, :status

node :photo do |user|
  user.photo.url(:square)
end
