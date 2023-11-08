from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
  __tablename__ = "carts"

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  user = db.relationship("User", back_populates='cart')
  cart_products = db.relationship('CartProduct', back_populates='cart')

  def to_dict(self):
      cart_data = {
          'id': self.id,
          'userId': self.user_id,
          'createdAt': self.created_at,
          'updatedAt': self.updated_at,
          'products': []
      }

      for cart_product in self.cart_products:
        if not cart_product.purchased:
          product_dict = cart_product.product.to_dict()
          product_dict['quantity'] = cart_product.quantity
          cart_data['products'].append(product_dict)

      return cart_data
