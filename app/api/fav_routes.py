from flask import Blueprint
from app.models import Product, User, db
from flask_login import login_required

favorite_routes = Blueprint("favorites", __name__)
