FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password, :name, :description] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end

  sequence :link, aliases: [:avatar] do |n|
    "//example.com/user#{n}.jpg"
  end

  sequence :type, [:Admin, :Developer, :Manager].cycle

  sequence :state, [:new_task, :in_development, :in_qa, :in_code_review, :ready_for_release, :released, :archived].cycle
end
