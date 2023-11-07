from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
  __tablename__ = "carts"

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), nullable=False))
  is_active = db.Column(db.Boolean, default=True)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  user = db.relationship("User", back_populates='cart')
  products = db.relationship("Product", secondary="cart_products", back_populates="carts")

  def to_dict(self):
      return {
          'id': self.id,
          'userId': self.user_id,
          'isActive': self.is_active,
          'createdAt': self.created_at,
          'updatedAt': self.updated_at
      }
