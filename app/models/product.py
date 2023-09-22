# "products"
from .db import db, environment, SCHEMA



class Product(db.Model):
  __tablename__ = "products"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  price = db.Column(db.Numeric(6,2), nullable=False)
  seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False)
  updatedAt = db.Column(db.DateTime, nullable=False)

  product_images = db.relationship('ProductImage', back_populates='products')
  
