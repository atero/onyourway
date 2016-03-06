require 'test_helper'

class Api::V1::TasksControllerTest < ActionController::TestCase

  ############################################################
  ################# TESTING GET - show  ######################
  ############################################################


  test "should not show without token" do
    t = User.first.tasks.first
    get :show  , :format => "json" , :id => t[:id]
    assert_response 401
  end

  test "admin should be able to show any task" do
    u = User.where(:role => :admin).first

    u1 = User.where(:role => :manager).first
    u2 = User.where(:role => :user).first
    u3 = User.where(:role => :admin).first

    get :show, :format => "json", :user_id => u1[:id], :id => u1.tasks.first[:id], :token => u[:token]
    assert_response 200

    get :show, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => u[:token]
    assert_response 200

    get :show, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => u[:token]
    assert_response 200
  end

  test "manager should be able to show user task" do
    
    manager = User.where(:role=>"manager").first
    u = User.where(:role=>"user").first

    get :show, :format => "json", :id => u.tasks.first[:id], :user_id=>u[:id], :token => manager[:token]
    assert_response 200

  end

  test "manager should not be able to show manager or admin task" do

    manager = User.where(:email=>"manager1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first

    get :show, :format => "json", :user_id => u1[:id], :id => u1.tasks.first[:id], :token => manager[:token]
    assert_response :unauthorized

    get :show, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => manager[:token]
    assert_response :unauthorized

  end

  test "user should be able to show his own task" do

    u = User.where(:role=> "user").first

    get :show, :format => "json", :user_id => u[:id], :token => u[:token], :id => u.tasks.first[:id]
    assert_response 200

  end

  test "user should not be able to show another user, admin or manager task" do

    user = User.where(:email=>"user1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first
    u3 = User.where(:email=>"user2@test.com").first

    get :show, :format => "json", :user_id => u1[:id], :id => u1.tasks.first[:id], :token => user[:token]
    assert_response :unauthorized

    get :show, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => user[:token]
    assert_response :unauthorized

    get :show, :format => "json", :user_id => u3[:id], :id => u3.tasks.first[:id], :token => user[:token]
    assert_response :unauthorized

  end

  ############################################################
  ################# TESTING POST - create  ####################
  ############################################################

  test "should not create without token" do
    post :create, :format => "json", :task => {:title => "New task"}
    assert_response :unauthorized
  end

  test "admin should be able to create a task for anyone" do

    u = User.where(:role => :admin).first

    u1 = User.where(:role => :manager).first
    u2 = User.where(:role => :user).first
    u3 = User.where(:role => :admin).first

    post :create, :format => "json", :user_id => u1[:id], :task => {:title => "New task for manager"}, :token => u[:token]
    assert_response 200
    assert_equal(1, User.find_by(:id => u1.id).tasks.where(:title => "New task for manager").count)

    post :create, :format => "json", :user_id => u2[:id], :task => {:title => "New task for user"}, :token => u[:token]
    assert_response 200
    assert_equal(1, User.find_by(:id => u2.id).tasks.where(:title => "New task for user").count)

    post :create, :format => "json", :user_id => u3[:id], :task => {:title => "New task for admin"}, :token => u[:token]
    assert_response 200
    assert_equal(1, User.find_by(:id => u3.id).tasks.where(:title => "New task for admin").count)

  end

  test "manager should be able to create a task for user" do
    
    manager = User.where(:role=>"manager").first
    u = User.where(:role=>"user").first

    post :create, :format => "json", :task => {:title => "New task for from manager to user"}, :user_id=>u[:id], :token => manager[:token]
    assert_response 200
    assert_equal(1, User.find_by(:id=>u.id).tasks.where(:title => "New task for from manager to user").count)

  end

  test "manager should not be able to create tasks for manager or admin" do

    manager = User.where(:email=>"manager1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first

    post :create, :format => "json", :user_id => u1[:id], :task => {:title => "New task for from manager to admin"}, :token => manager[:token]
    assert_response :unauthorized
    assert_equal(0, User.find_by(:id=>u1.id).tasks.where(:title => "New task for from manager to admin").count)

    post :create, :format => "json", :user_id => u2[:id], :task => {:title => "New task for from manager to manager"}, :token => manager[:token]
    assert_response :unauthorized
    assert_equal(0, User.find_by(:id=>u2.id).tasks.where(:title => "New task for from manager to manager").count)

  end

  test "user should be able to create his own task" do

    u = User.where(:role=> "user").first

    post :create, :format => "json", :user_id => u[:id], :token => u[:token], :task => {:title => "A task for me"}
    assert_response 200
    assert_equal(1, User.find_by(:id=> u.id).tasks.where(:title => "A task for me").count)

  end

  test "user should not be able to create tasks for another user, admin or manager" do

    user = User.where(:email=>"user1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first
    u3 = User.where(:email=>"user2@test.com").first

    post :create, :format => "json", :user_id => u1[:id], :task => {:title => "New task for from user to admin"}, :token => user[:token]
    assert_response :unauthorized
    assert_equal(0, User.find_by(:id=>u1.id).tasks.where(:title => "New task for from user to admin").count)

    post :create, :format => "json", :user_id => u2[:id], :task => {:title => "New task for from user to manager"}, :token => user[:token]
    assert_response :unauthorized
    assert_equal(0, User.find_by(:id=>u2.id).tasks.where(:title => "New task for from user to manager").count)

    post :create, :format => "json", :user_id => u3[:id], :task => {:title => "New task for from user to user"}, :token => user[:token]
    assert_response :unauthorized
    assert_equal(0, User.find_by(:id=>u3.id).tasks.where(:title => "New task for from user to user").count)

  end

  ############################################################
  ################# TESTING PUT - update  ####################
  ############################################################

  test "should not update without token" do
    u = User.where(:role => :admin).first

    put :update, :format => "json",:id => u.tasks.first[:id], :user_id=>u[:id], :task => {:title => "New task"}
    assert_response :unauthorized
  end

  test "admin should be able to update a task for anyone" do

    u = User.where(:role => :admin).first

    u1 = User.where(:role => :manager).first
    t1 = u1.tasks.first
    u2 = User.where(:role => :user).first
    t2 = u2.tasks.first
    u3 = User.where(:role => :admin).first
    t3 = u3.tasks.first

    put :update, :format => "json", :user_id => u1[:id], :id=>t1[:id], :task => {:title => "New title"}, :token => u[:token]
    assert_response 200
    assert_equal("New title", User.where(:role => :manager).first.tasks.where(:id => t1.id).first.title)

    put :update, :format => "json", :user_id => u2[:id], :id=>t2[:id], :task => {:title => "New title"}, :token => u[:token]
    assert_response 200
    assert_equal("New title", User.where(:role => :user).first.tasks.where(:id => t2.id).first.title)

    put :update, :format => "json", :user_id => u3[:id], :id=>t3[:id], :task => {:title => "New title"}, :token => u[:token]
    assert_response 200
    assert_equal("New title", User.where(:role => :admin).first.tasks.where(:id => t3.id).first.title)

  end

  test "manager should be able to update users task" do
    
    manager = User.where(:role=>"manager").first
    u = User.where(:role=>"user").first
    t = u.tasks.first

    put :update, :format => "json",:id => t.id, :task => {:title => "New title for user"}, :user_id=>u[:id], :token => manager[:token]
    assert_response 200
    assert_equal("New title for user", User.where(:role=>"user").first.tasks.where(:id => t.id).first.title)

  end

  test "manager should not be able to update manager or admin tasks" do

    manager = User.where(:email=>"manager1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    t1 = u1.tasks.first
    u2 = User.where(:email=>"manager2@test.com").first
    t2 = u2.tasks.first

    put :update, :format => "json", :user_id => u1[:id], :id => t1[:id], :task => {:title => "New title for from manager to admin"}, :token => manager[:token]
    assert_response :unauthorized
    assert_not_equal("New title for from manager to admin", User.find_by(:id => u1.id).tasks.find_by(:id => t1.id).title)

    put :update, :format => "json", :user_id => u2[:id], :id => t2[:id], :task => {:title => "New title for from manager to manager"}, :token => manager[:token]
    assert_response :unauthorized
    assert_not_equal("New title for from manager to manager", User.find_by(:id => u2.id).tasks.find_by(:id => t2.id).title)

  end

  test "user should be able to update his own task" do

    u = User.where(:role=> "user").first
    t = u.tasks.first

    put :update, :format => "json", :user_id => u[:id], :id => t[:id], :task => {:title => "New title for my task"}, :token => u[:token]
    assert_response 200
    assert_equal("New title for my task", User.find_by(:id => u.id).tasks.find_by(:id =>t.id).title)

  end

  test "user should not be able to update tasks for another user, admin or manager" do

    user = User.where(:email=>"user1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    t1=u1.tasks.first
    u2 = User.where(:email=>"manager2@test.com").first
    t2=u2.tasks.first
    u3 = User.where(:email=>"user2@test.com").first
    t3=u3.tasks.first

    put :update, :format => "json", :user_id => u1[:id], :id => t1[:id], :task => {:title => "New title from user to admin"}, :token => user[:token]
    assert_response :unauthorized
    assert_not_equal("New title from user to admin", User.find_by(:id => u1.id).tasks.find_by(:id => t1.id).title)

    put :update, :format => "json", :user_id => u2[:id], :id => t2[:id], :task => {:title => "New title from user to manager"}, :token => user[:token]
    assert_response :unauthorized
    assert_not_equal("New title from user to manager", User.find_by(:id => u2.id).tasks.find_by(:id => t2.id).title)

    put :update, :format => "json", :user_id => u3[:id], :id => t3[:id], :task => {:title => "New title from user to user"}, :token => user[:token]
    assert_response :unauthorized
    assert_not_equal("New title from user to user", User.find_by(:id => u3.id).tasks.find_by(:id => t3.id).title)

  end
  ############################################################
  ################# TESTING DELETE - destroy  ######################
  ############################################################


  test "should not destroy without token" do
    t = User.first.tasks.first
    delete :destroy, :format => "json" , :id => t[:id]
    assert_response 401
  end

  test "admin should be able to destroy any task" do
    u = User.where(:role => :admin).first

    u1 = User.where(:role => :manager).first
    n1 = u1.tasks.count
    u2 = User.where(:role => :user).first
    n2 = u2.tasks.count
    u3 = User.where(:role => :admin).first
    n3 = u3.tasks.count

    delete :destroy, :format => "json", :user_id => u1[:id], :id => u1.tasks.first[:id], :token => u[:token]
    assert_response 200
    assert_equal(n1-1, User.find_by(:id=> u1.id).tasks.count)


    delete :destroy, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => u[:token]
    assert_response 200
    assert_equal(n2-1, User.find_by(:id=> u2.id).tasks.count)

    delete :destroy, :format => "json", :user_id => u3[:id], :id => u3.tasks.first[:id], :token => u[:token]
    assert_response 200
    assert_equal(n3-1, User.find_by(:id=> u3.id).tasks.count)
  end

  test "manager should be able to delete user task" do
    
    manager = User.where(:role=>"manager").first
    u = User.where(:role=>"user").first
    n = u.tasks.count

    delete :destroy, :format => "json", :user_id => u[:id], :id => u.tasks.first[:id], :token => manager[:token]
    assert_response 200
    assert_equal(n-1, User.find_by(:id=> u.id).tasks.count)

  end

  test "manager should not be able to delete manager or admin task" do

    manager = User.where(:email=>"manager1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first

    delete :destroy, :format => "json", :user_id => u1[:id], :id => u1.tasks.first[:id], :token => manager[:token]
    assert_response :unauthorized

    delete :destroy, :format => "json", :user_id => u2[:id], :id => u2.tasks.first[:id], :token => manager[:token]
    assert_response :unauthorized

  end

  test "user should be able to destroy his own task" do

    u = User.where(:role=> "user").first
    t = u.tasks.first

    delete :destroy, :format => "json", :user_id => u[:id], :id => t[:id], :token => u[:token]
    assert_response 200
    assert_equal(0, User.find_by(:id=> u.id).tasks.where(:id => t.id).count)

  end

  test "user should not be able to destroy another user, admin or manager task" do

    user = User.where(:email=>"user1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    t1 = u1.tasks.first
    u2 = User.where(:email=>"manager2@test.com").first
    t2 = u2.tasks.first
    u3 = User.where(:email=>"user2@test.com").first
    t3 = u3.tasks.first

    delete :destroy, :format => "json", :user_id => u1[:id], :id => t1[:id], :token => user[:token]
    assert_response :unauthorized

    delete :destroy, :format => "json", :user_id => u2[:id], :id => t2[:id], :token => user[:token]
    assert_response :unauthorized

    delete :destroy, :format => "json", :user_id => u3[:id], :id => t3[:id], :token => user[:token]
    assert_response :unauthorized

  end
  # ############################################################
  # ################# TESTING GET - index  #####################
  # ############################################################


  test "should not index without token" do
    u = User.first
    get :index  , :format => "json"
    assert_response 401
  end

  test "admin should be able to index anybodys task" do

    u = User.where(:role => :admin).first

    u1 = User.where(:role => :manager).first
    u2 = User.where(:role => :user).first
    u3 = User.where(:role => :admin).first

    get :index, :format => "json", :user_id => u1[:id], :token => u[:token]
    assert_equal(u1.tasks.count ,json.length)

    get :index, :format => "json", :user_id => u2[:id], :token => u[:token]
    assert_equal(u2.tasks.count ,json.length)

    get :index, :format => "json", :user_id => u3[:id], :token => u[:token]
    assert_equal(u3.tasks.count ,json.length)

  end

  test "manager should be able to index user task" do
    
    manager = User.where(:role=>"manager").first
    u = User.where(:role=>"user").first

    get :index, :format => "json", :user_id=>u[:id], :token => manager[:token]
    assert_equal(u.tasks.count ,json.length)

  end

  test "manager should not be able to index manager or admin task" do

    manager = User.where(:email=>"manager1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first

    get :index, :format => "json", :user_id => u1[:id], :token => manager[:token]
    assert_response :unauthorized

    get :index, :format => "json", :user_id => u2[:id], :token => manager[:token]
    assert_response :unauthorized

  end

  test "user should be able to index his own task" do

    u = User.where(:role=> "user").first

    get :index, :format => "json", :user_id => u[:id], :token => u[:token]
    assert_equal(u.tasks.count ,json.length)

  end

  test "user should not be able to index another user, admin or manager task" do

    user = User.where(:email=>"user1@test.com").first

    u1 = User.where(:email=>"admin@test.com").first
    u2 = User.where(:email=>"manager2@test.com").first
    u3 = User.where(:email=>"user2@test.com").first

    get :index, :format => "json", :user_id => u1[:id], :token => user[:token]
    assert_response :unauthorized

    get :index, :format => "json", :user_id => u2[:id], :token => user[:token]
    assert_response :unauthorized

    get :index, :format => "json", :user_id => u3[:id], :token => user[:token]
    assert_response :unauthorized

  end
end
