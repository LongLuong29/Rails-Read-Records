# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://127.0.0.1:5500'  # Thay đổi theo địa chỉ của trang web frontend của bạn
      resource '/records', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
  end
  