## Users
user1 = User.create!(:name=>"User one", :email=>"user1@test.com", :password=>'pass12345', :role=>:user)
user2 = User.create!(:name=>"User two", :email=>"user2@test.com", :password=>'pass12345', :role=>:user)
user3 = User.create!(:name=>"User three", :email=>"user3@test.com", :password=>'pass12345', :role=>:user)
manager1 = User.create!(:name=>"Manager one", :email=>"manager1@test.com", :password=>'pass12345', :role=>:manager)
manager2 = User.create!(:name=>"Manager two", :email=>"manager2@test.com", :password=>'pass12345', :role=>:manager)
admin = User.create!(:name=>"Admin", :email=>"admin@test.com", :password=>'pass12345', :role=>:admin)

## Tasks
Task.create!(:title=>"my task 1", :user => user1)
Task.create!(:title=>"my task 2", :user => user1)
Task.create!(:title=>"my task 1", :user => user1)
Task.create!(:title=>"my task 2", :user => user1)
Task.create!(:title=>"my task 3", :user => user2)
Task.create!(:title=>"my task 4", :user => user2)
Task.create!(:title=>"my task 3", :user => user2)
Task.create!(:title=>"my task 4", :user => user2)
Task.create!(:title=>"my task 5", :user => user3)
Task.create!(:title=>"my task 6", :user => user3)
Task.create!(:title=>"my task 7", :user => manager1)
Task.create!(:title=>"my task 77", :user => manager1)
Task.create!(:title=>"my task 7", :user => manager1)
Task.create!(:title=>"my task 77", :user => manager1)
Task.create!(:title=>"my task 8", :user => manager2)
Task.create!(:title=>"my task 888", :user => manager2)
Task.create!(:title=>"my task 8", :user => manager2)
Task.create!(:title=>"my task 888", :user => manager2)
Task.create!(:title=>"my task 9", :user => admin)
Task.create!(:title=>"my task 11", :user => admin)
Task.create!(:title=>"my task 12", :user => admin)
