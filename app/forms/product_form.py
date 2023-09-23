from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('description', validators=[
                                DataRequired(), Length(max=255)])
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=0, max=10000)])
    category_id = IntegerField('category', validators=[DataRequired()])
