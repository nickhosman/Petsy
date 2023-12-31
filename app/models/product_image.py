from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ProductImage(db.Model):
  __tablename__ = "product_images"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  preview = db.Column(db.Boolean, default=False)
  image_url = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  # foreign key
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)

  #relationship
  product = db.relationship("Product", back_populates="product_images")

  def to_dict(self):
    return {
      "id" : self.id,
      "preview" : self.preview,
      "imageUrl" : self.image_url,
      "productId" : self.product_id
    }
