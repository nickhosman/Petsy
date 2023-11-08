from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
  __tablename__ = "orders"

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

  user = db.relationship("User", back_populates='orders')
  order_products = db.relationship('OrderProduct', back_populates='order')

  def to_dict(self):
      order_data = {
          'id': self.id,
          'userId': self.user_id,
          'createdAt': self.created_at,
          'products' : []
      }

      for order_product in self.order_products:
          product_dict = order_product.product.to_dict()
          product_dict['quantity'] = order_product.quantity
          order_data['products'].append(product_dict)

      return order_data
