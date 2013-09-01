class ProjectsController < ApplicationController

def index
   @projects = Project.all.to_a
   @project_new = Project.new
   @task_new = Task.new
end

def create
	@project = Project.create!(params.require(:project).permit(:name))
	@task_new = Task.new
	render partial: 'project', locals: {project: @project}, layout: false
end

def destroy
	Project.find(params[:id]).destroy
	render nothing: true	
end

def edit
	@project = Project.find(params[:id])
end

def update
	if Project.find(params[:id]).update_attributes(params.permit(:name))
		render nothing: true
	else
		render nothing: true, status: 422	
	end
end

end
