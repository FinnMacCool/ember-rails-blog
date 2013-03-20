class ApplicationController < ActionController::Base
  respond_to :json

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url
  end

  private

  def requires_parameters(creating = false, *required)
    required.each do |p|
      raise EmberBlog::InvalidParameters.new(p) unless (params.has_key?(p) || creating && params.first[1].has_key?(p))
    end
  end
end
