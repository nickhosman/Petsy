from flask_wtf import FlaskForm
from wtforms import StringField, DateField,BooleanField,IntegerField
from wtforms.validators import DataRequired,ValidationError


class ProductImageForm(FlaskForm):
  preview=BooleanField(default=False)
  image_url=StringField(validators=[DataRequired()])
  product_id=IntegerField(validators=[DataRequired()])

  def validate_image_url(form, field):
        img_ext = ('jpg','png','jpeg')
        if not any(field.data.endswith(ext) for ext in img_ext):
            raise ValidationError("Image URLs have to end with '.jpg' or '.jpeg' or '.png'")