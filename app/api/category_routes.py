from flask import Blueprint
from app.models import Category, db
from flask_login import login_required

category_routes = Blueprint("categories", __name__)
