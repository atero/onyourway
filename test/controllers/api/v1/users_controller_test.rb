require 'test_helper'

class Api::V1::UsersControllerTest < ActionController::TestCase

  ############################################################
  ################# TESTING GET - show  ######################
  ############################################################


  test "should not show without auth" do
    u=User.first
    get :show  , :format => "json" , :id => u[:id]
    assert_response 401
  end

  test "user should be able to show" do
    u=User.where(:name=> "User one").first
    get :show, :format => "json", :id => u[:id], :token => u[:token]
    assert_response 200
  end

  test "admin should be able to show" do
    u=User.where(:role=>"admin").first
    get :show, :format => "json", :id => u[:id], :token => u[:token]
    assert_response 200
  end

  ############################################################
  ################# TESTING GET - index  #####################
  ############################################################

  test "should not index without auth" do
    u=User.first
    get :index  , :format => "json"
    assert_response 401
  end

  test "user should not be able to index" do
    u=User.find_by(:role=>"user")
    get :index  , :format => "json" , :token => u[:token]
    assert_response 401
  end

  test "admin should be able to index everybody" do
    u=User.find_by(:role=>"admin")
    get :index  , :format => "json" , :token => u[:token]
    assert_response 200
    assert_equal(User.all.length,json.length)
  end

  test "manager should be able to index only users and himself" do
    u=User.find_by(:role=>"manager")
    get :index  , :format => "json" , :token => u[:token]
    assert_response 200
    assert_equal(User.where(:role => "user").all.length + 1,json.length)
  end


  ############################################################
  ################# TESTING PUT - update  ####################
  ############################################################

  test "should not update without auth" do

    User.where(:email=>'testusernoauth@test.com').all.destroy

    u=User.create!(:name=>'test user no auth',:email=>'testusernoauth@test.com',:password =>'pass12345', :preferred_hours => 5)

    put :update  , :format => "json" , :id => u[:id], :preferred_hours => 8

    assert_response 401

    updated=User.find_by(:id=>u[:id])

    assert_equal(updated.preferred_hours, 5)

    User.find_by(:email=>'testusernoauth@test.com').destroy

  end

  test "should be able to update his own pref hours" do
    
    User.where(:email=>'test@test.com').all.destroy

    u=User.create!(:name=>'test user no auth',:email=>'test@test.com',:password =>'pass12345', :preferred_hours => 8)
    
    put :update  , :format => "json" , :id => u[:id], :token => u[:token], :preferred_hours => 6

    assert_response 200

    updated=User.find_by(:id=>u[:id])

    assert_equal(updated.preferred_hours, 6)

    User.find_by(:email=>'test@test.com').destroy

  end

  test "user should be created with initial preferred hours" do

    User.where(:email=>'email@email.com').all.destroy

    post :create, :format => "json", :name => "Test Test", :email => "email@email.com", :password => "testpassword"

    assert_response 200
   
    assert_equal(User.where(:email=>'email@email.com').length, 1)
    assert_equal(8, User.where(:email=>'email@email.com').first.preferred_hours)

    User.find_by(:email=>'email@email.com').destroy
  end

end