class CategoriesController < ApplicationController
  load_and_authorize_resource except: [:minimum_parameter_keys, :min_params]

  # GET /categories.json
  def index
    categories = Category.all
    render json: categories, meta: { total: categories.count }
  end

  # GET /categories/1.json
  def show
    requires_parameters(*[:id])
    category = Category.find(params[:id])
    render json: category
  end

  # POST /categories.json
  def create
    requires_parameters(params[:category], *minimum_parameter_keys)
    category = Category.create(min_params)
    if category.save
      render json: category, location: category_path(category), status: :created
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  # PATCH|PUT /categories/1.json
  def update
    requires_parameters(params[:category], *minimum_parameter_keys)
    requires_parameters(*[:id])
    category = Category.find(params[:id])

    if category.update_attributes(min_params)
      head :no_content
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1.json
  def destroy
    requires_parameters(*[:id])
    category = Category.find(params[:id])
    category.destroy

    head :no_content
  end

  private

  def minimum_parameter_keys
    [:name]
  end

  def min_params
    params[:category].slice(*minimum_parameter_keys)
  end
end
