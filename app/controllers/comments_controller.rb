class CommentsController < ApplicationController
  load_and_authorize_resource except: [:minimum_parameter_keys, :min_params]

  # GET /comments.json
  def index
    comments = Comment.all #where("post_id = ?", params[:post_id]).all
    render json: comments, meta: { total: comments.count }
  end

  # GET /comments/1.json
  def show
    requires_parameters(*[:id])
    comment = Comment.find(params[:id])
    render json: comment
  end

  # POST /comments.json
  def create
    requires_parameters(params[:comment], *minimum_parameter_keys)
    comment = Comment.create(min_params)
    comment.user = current_user if current_user
    if comment.save
      render json: comment, location: comment_path(comment), status: :created
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH|PUT /comments/1.json
  def update
    requires_parameters(params[:comment], *minimum_parameter_keys)
    requires_parameters(*[:id])
    comment = Comment.find(params[:id])

    if comment.update_attributes(min_params)
      head :no_content
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1.json
  def destroy
    requires_parameters(*[:id])
    comment = Comment.find(params[:id])
    comment.destroy

    head :no_content
  end

  private

  def minimum_parameter_keys
    [:text, :post_id]
  end

  def min_params
    params[:comment].slice(*minimum_parameter_keys)
  end
end