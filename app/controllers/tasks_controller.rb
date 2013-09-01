class TasksController < ApplicationController

	def create
		@task = Task.create!(params.require(:task).permit(:name, :project_id))
		render partial: 'tasks/task_form', locals: {project: @task.project, task: @task}, layout: false and return if request.xhr?
	end

	def destroy
		Task.find(params[:id]).destroy
		render nothing: true
	end

	def checkbox
		@task = Task.find(params[:id])
		@task.status ^= true
		@task.save!
		render nothing: true
	end

	def update
		if Task.find(params[:id]).update_attributes(params.permit(:name, :deadline))
			render nothing: true
		else
			#Implement sending error header and procesing it in javascript event listener
		end
	end

	def up
		Task.where(id:params[:id]).first.up
		render nothing: true
	end

	def down
		Task.where(id:params[:id]).first.down
		render nothing: true
	end

	
end
