from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
  stars=IntegerField("Stars",default=1)
  details=TextAreaField("Details",validators=[DataRequired(),Length(min=20)])