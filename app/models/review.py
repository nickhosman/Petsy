from .db import db, environment, SCHEMA


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)

    # foreign keys
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

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
