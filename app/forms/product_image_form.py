from flask_wtf import FlaskForm
from wtforms import StringField, DateField,BooleanField,IntegerField
from wtforms.validators import DataRequired


class ProductImageForm(FlaskForm):
  preview=BooleanField(default=False)
  image_url=StringField(validators=[DataRequired()])
  product_id=IntegerField(validators=[DataRequired()])
