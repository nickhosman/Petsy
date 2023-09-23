from flask import Blueprint
from app.models import Tag, db
from flask_login import login_required

tag_routes = Blueprint("tags", __name__)
