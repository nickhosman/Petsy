from flask import Blueprint, request
from app.models import Tag, db
from flask_login import login_required
from ..forms.tag_form import TagForm
from .auth_routes import validation_errors_to_error_messages

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

@tag_routes.route('/', methods=["POST"])
def add_tag():
    """
    Add a tag to the database
    """
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        tag = Tag(
            name = form.data["name"]
        )
        db.session.add(tag)
        db.session.commit()
        return tag.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400
