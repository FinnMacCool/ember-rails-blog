class ApplicationController < ActionController::Base
  respond_to :json

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url
  end

  serialization_scope :current_user

  private

  def requires_parameters(parameters = params, *required)
    required.each do |p|
      raise EmberBlog::InvalidParameters.new(p) unless parameters.has_key?(p)
    end
  end
end
