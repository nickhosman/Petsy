from flask import Blueprint, request
from app.models import Review, db
from flask_login import login_required, current_user
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint("reviews", __name__)

@review_routes.route("/<int:reviewId>", methods=["DELETE"])
@login_required
def delete_review(reviewId):
  """
  Deletes a review from the database by id
  """
  review = Review.query.get(reviewId)
  print("REVIEW", review)

  if not review:
    return {"error": "Review not found"}

  if review.user_id != current_user.id:
    return {"error": ['Unauthorized']}, 401

  db.session.delete(review)
  db.session.commit()

  return {"message": "Successfully deleted review"}




@review_routes.route("/<int:reviewId>", methods=["PUT"])
@login_required
def edit_review(reviewId):
  """
  Updates a review in the database by id
  """
  review = Review.query.get(reviewId)

  if not review:
    return {"error": "Review could not be found"}, 404

  if review.user_id != current_user.id:
    return {"error": "Unauthorized"}, 401

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review.stars = form.data['stars']
    review.details = form.data['details']

    db.session.commit()
    return review.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
