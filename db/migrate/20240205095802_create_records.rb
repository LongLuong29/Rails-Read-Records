class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.string :name
      t.string :description
      t.string :price
      t.string :category

      t.timestamps
    end
  end
end
