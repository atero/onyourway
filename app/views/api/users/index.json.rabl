object @users

attributes :id, :from, :to, :date, :item, :messages, :status
p '999999999999999999999999999999999999'
node :photo do |user|
  user.photo.url(:square)
end
