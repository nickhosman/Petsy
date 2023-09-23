from flask import Blueprint
from app.models import Tag, db
from flask_login import login_required

tag_routes = Blueprint("tags", __name__)

@tag_routes.route('/')
def get_tags():
    """
    Returns all tags
    """
    all_tags=Tag.query.all()
    tag_dict={}
    for tag in all_tags:
        data=tag.to_dict()
        tag_dict[str(tag.id)]=data
    return {"Tags":tag_dict}