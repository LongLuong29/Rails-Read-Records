class RecordsController < ApplicationController
    # skip_before_action :verify_authenticity_token

    def index
        @records = Record.all
        respond_to do |format|
            format.html
            format.json { render json: @records }   
        end
    end
    
    def show
        @record = Record.find(params[:id])
        render json: @record
    end 
    
    def create
        @record = Record.new(record_params)
        if @record.save
            render json: @record, status: :created
          else
            render json: @record.errors, status: :unprocessable_entity
          end
    end

    def update
        @record = Record.find(params[:id])

        if @record.update(record_params)
            render json: @record
        else
            render json: @record.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @record = Record.find(params[:id])
        @record.destroy
    end

    private 
        def record_params
            params.require(:record).permit(:name, :description, :price, :category)
        end
    
end