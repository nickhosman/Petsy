from flask import Blueprint
from app.models import Category, db
from flask_login import login_required

category_routes = Blueprint("categories", __name__)

@category_routes.route("/")
def get_categories():
    """
    Returns all categories
    """
    all_categories=Category.query.all()
    category_dict = {}
    for category in all_categories:
        data=category.to_dict()
        category_names=category.name
        category_dict[str(category.id)] = data
    return {"Category": category_dict}