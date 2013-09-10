require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  test "the truth" do
  	project = Project.new
    assert project.invalid?
    assert project.errors[:name].any?
  end
end
