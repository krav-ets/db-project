FactoryBot.define do
  factory :task do
    name
    description
    author factory: :manager
    assignee factory: :developer
    state
    expired_at { Date.tomorrow }
  end
end
