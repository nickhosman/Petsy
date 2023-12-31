from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # foreign keys
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # relationship
    product = db.relationship("Product", back_populates="reviews")
    users = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'stars': self.stars,
            'details': self.details,
            'productId': self.product_id,
            'userId': self.user_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
