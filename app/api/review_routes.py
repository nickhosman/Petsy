from flask import Blueprint
from app.models import Review, db
from flask_login import login_required, current_user

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
  """
  Deletes a review from the database by id
  """
  review = Review.query.get(reviewId)
  if review.user_id == current_user.id:
    db.session.delete(review)
    db.session.commit()
  return {'errors': ['Unauthorized']}


@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):
  """
  Updates a review in the database by id
  """
  review = Review.query.get(reviewId)
  if review.user_id == current_user.id:

