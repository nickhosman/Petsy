from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length,ValidationError


class ReviewForm(FlaskForm):
  stars=IntegerField("Stars",default=0)
  details=TextAreaField("Details",validators=[DataRequired()])

  def validate_stars(form, field):
      if not field.data:
          raise ValidationError('Rating is required.')
  def validate_details(form, field):
      if len(field.data) < 15:
          raise ValidationError('Review text must be at least 15 characters.')

# {
#  "message": "Bad Request",
#  "errors": {

#     “stars” : “Rating is required”,

#     “details” : “Review text must be at least 15 characters”
#  }
# }
