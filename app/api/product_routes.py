from flask import Blueprint
from app.models import Product, ProductImage, db
from flask_login import login_required

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
def create_product():
    """
    Adds a product to the database
    """
