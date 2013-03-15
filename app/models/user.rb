class User < ActiveRecord::Base
  # Roles
  ROLES = %w[Commentator Editor Admin]

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :omniauthable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :name, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body

  after_create :init_role

  has_many :authentications
  has_many :posts
  has_many :comments
  validates_presence_of :name
  validates_uniqueness_of :name

  def apply_omniauth(omniauth)
    self.email = omniauth['user_info']['email'] if email.blank?
    authentications.build(:provider => omniauth['provider'], :uid => omniauth['uid'])
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end

  def init_role
    if role.blank?
      update_attribute(:role, "Commentator")
    end
  end
end
