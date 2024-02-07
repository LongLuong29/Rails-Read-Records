Rails.application.routes.draw do
  root 'records#index'
  get 'records/index'

  # Sử dụng resources để định nghĩa tất cả các RESTful routes cho records
  resources :records
end
