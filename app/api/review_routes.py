from flask import Blueprint
from app.models import Review, db
from flask_login import login_required

review_routes = Blueprint("reviews", __name__)

