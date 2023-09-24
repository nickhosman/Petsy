from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Product, db, favorites

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
        return {'errors':"User not found"}, 404

    user_fav_products=curr_user.fav_products

    fav_dict = {}

    for fav in user_fav_products:
        data = fav.to_dict()
        images = fav.product_images
        for image in images:
            if image.preview:
                data["previewImage"] = image.image_url
                break
        fav_dict[str(fav.id)] = data

    return fav_dict

@user_routes.route('/<int:id>/products')
@login_required
def get_user_products(id):
    """
    Get all listings of a user
    """
    existing_user = User.query.get(id)
    if not existing_user:
        return {'errors':"User not found"}, 404

    if int(current_user.get_id()) != id:
        return {'errors': 'Products do not belong to User'}, 403

    user_owned_products = Product.query.filter_by(seller_id=id).all()

    owned_dict = {}

    for product in user_owned_products:
        data = product.to_dict()
        images = product.product_images
        for image in images:
            if image.preview:
                data["previewImage"] = image.image_url
                break
        owned_dict[str(product.id)] = data

    return owned_dict

@user_routes.route('/<int:id>/favorites', methods=['POST'])
@login_required
def post_favorite(id):
    """
    Create a favorite for a user
    """
    # get current user
    curr_user = User.query.get(id)
    #if theres no logged in user...
    if not curr_user:
        return {"error": "Must log in to add to favorites"}

    form = AddToFavorite()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data["product_id"]
        user_id = form.data["user_id"]

    product = Product.query.get(product_id)

     # Check if the product is already in the user's favs
    if product in curr_user.fav_products:
        return {"message": "Product is already in favorites"}, 400

    #add product to favs
    curr_user.fav_products.append(product)
    db.session.commit()
    return {"message": "Successfully added to favorites"}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
