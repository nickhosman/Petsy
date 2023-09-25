from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange,ValidationError


class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('description', validators=[
                                DataRequired(), Length(max=255)])
    price = DecimalField('price', validators=[DataRequired(), NumberRange(min=0, max=10000)])
    category_id = IntegerField('category', validators=[DataRequired()])

    def validate_name(form, field):
        if not field.data:
            raise ValidationError('Name is required.')
    def validate_description(form, field):
        if len(field.data) < 30:
            raise ValidationError('Description must be at least 30 characters.')
    def validate_price(form, field):
        if field.data>10000:
            raise ValidationError('Price cannot exceed $10,000 USD.')


# {
#  "message": "Bad Request",
#  "errors": {
#    "name” : “Name is required”,
#     “description” : “Description must be at least 30 characters”,
#     “price” : “Price cannot exceed $10,000 USD”
#  }
# }
