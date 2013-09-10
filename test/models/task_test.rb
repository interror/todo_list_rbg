require 'test_helper'

class TaskTest < ActiveSupport::TestCase
	test "the truth" do
   		task = Task.new
   		assert task.invalid?
   		assert task.errors["name"].any?
   	end
end
