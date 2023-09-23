from flask import Blueprint
from app.models import Product, ProductImage, db
from flask_login import login_required

product_routes = Blueprint("products", __name__)
