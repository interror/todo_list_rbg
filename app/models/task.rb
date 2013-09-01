class Task < ActiveRecord::Base
		belongs_to :project

		before_create :setup_priority

		validates :name, presence: true
		validates_uniqueness_of :name, scope: :project_id
		
	def up
		if victim = Task.where(project_id: self.project_id, priority: (self.priority+1)).first
			self.priority, victim.priority = victim.priority, self.priority
			self.save
			victim.save
		end
	end

	def down
		if victim = Task.where(project_id: self.project_id, priority: (self.priority-1)).first
			self.priority, victim.priority = victim.priority, self.priority
			self.save
			victim.save
		end
	end

	def setup_priority
		task = Task.where(project_id: self.project_id).order(priority: :desc).first
			self.priority=if task
			task.priority + 1
		else
			0
		end
	end
end
