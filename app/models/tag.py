# "tags"
from .db import db, environment, SCHEMA


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    products = db.relationship('Product', secondary="product_tags", back_populates='all_tags')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
