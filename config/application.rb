require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "action_mailer/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShopNShip
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.middleware.use Rack::Deflater
    # config.active_job.queue_adapter = :delayed_job
    config.action_dispatch.default_headers = {
          'X-Frame-Options' => 'DENY'
    }
    config.autoload_paths << Rails.root.join('lib')
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.assets.precompile += ['vendor/assets/**/*']
    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
    config.assets.precompile << /\.(?:svg|eot|otf|woff|ttf)\z/


    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
  end
end
