from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Product, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>/favorites')
@login_required
def get_favorites(id):
    """
    Get all favorites of a user
    """
    curr_user=User.query.get(id)

    if not curr_user:
        return {'errors': {"User": "User not found"}}, 404

    user_fav_products=curr_user.fav_products

    fav_dict={}

    for fav in user_fav_products:
        data=fav.to_dict()
        images=fav.product_images
        for image in images:
            if image.preview:
                data["previewImage"] = image.image_url
                break
        fav_dict[str(fav.id)]=data

    return fav_dict

@user_routes.route('/<int:id>/favorites', methods=['POST'])
@login_required
def post_favorite(id):
    """
    Create a favorite for a user
    """

    product = Product.query.get(request.productId)
    curr_user = User.query.get(id)
    curr_user.fav_products.append(product)
    db.session.commit()

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
