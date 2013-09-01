TodoList::Application.routes.draw do

  root to: 'projects#index'

  resources :projects do
    resources :tasks do
    	member do
    		put :up
    		put :down
    	end
    end
  end
put '/task/:id/checkbox', to: "tasks#checkbox"
end
