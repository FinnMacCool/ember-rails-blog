class UsersController < ApplicationController
  load_and_authorize_resource except: [:minimum_parameter_keys, :min_params]

  # GET /users.json
  def index
    users = User.all
    render json: users, meta: { total: users.count }
  end

  # GET /users/1.json
  def show
    requires_parameters(*[:id])
    user = User.find(params[:id])
    render json: user
  end

  # POST /users.json
  def create
    requires_parameters(params[:user], *minimum_parameter_keys)
    user = User.create(min_params)
    if user.save
      render json: user, location: user_path(user), status: :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # PATCH|PUT /users/1.json
  def update
    requires_parameters(params[:user], *minimum_parameter_keys)
    requires_parameters(*[:id])
    user = User.find(params[:id])

    if user.update_attributes(min_params)
      head :no_content
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1.json
  def destroy
    requires_parameters(*[:id])
    user = User.find(params[:id])
    user.destroy

    head :no_content
  end

  private

  def minimum_parameter_keys
    [:email, :name]
  end

  def min_params
    params.slice(*minimum_parameter_keys)
  end
end
