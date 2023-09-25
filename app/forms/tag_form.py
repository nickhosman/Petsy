from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired,ValidationError


class TagForm(FlaskForm):
  name=StringField(validators=[DataRequired()])
  def validate_name(form, field):
      if len(field.data) > 25:
        raise ValidationError('Tag name can not exceed 25 characters')
