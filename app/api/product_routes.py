from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Product, ProductImage, db
from app.forms import ProductForm
from app.api.auth_routes import validation_errors_to_error_messages

product_routes = Blueprint("products", __name__)


@product_routes.route("/")
def get_products():
    """
    Returns a dictionary containing all products
    """
    all_products = Product.query.all()
    product_dict = [(product.id, product.to_dict())
                    for product in all_products]

    return {"Products": dict(product_dict)}


@product_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    """
    Adds a product to the database
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name = form.data["name"],
            description = form.data["description"],
            price = form.data["price"],
            seller_id = current_user.id,
            category_id = form.data["category_id"]
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route("/<int:productId>", methods=["PUT"])
@login_required
def edit_product(productId):
    """
    Updates a product in the database
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product.query.filter_by(id=productId)
        product.name = form.data["name"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        product.category_id = form.data["category_id"]

        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
