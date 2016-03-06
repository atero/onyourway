require 'csv'

desc "loading test data"

task :load_test_data => :environment do
	if Rails.env.test?
		Rake::Task['db:purge'].invoke()
		Rake::Task['db:seed'].invoke()
	else
		puts "This task can only be run in test environment"
	end
end