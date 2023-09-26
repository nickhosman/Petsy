from .db import db, environment, SCHEMA
from datetime import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(6, 2), nullable=False)
    seller_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        'categories.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    product_images = db.relationship('ProductImage', back_populates='product', cascade="all, delete, delete-orphan")
    category = db.relationship("Category", back_populates="products")
    all_tags = db.relationship(
        "Tag", secondary="product_tags", back_populates="products")
    reviews = db.relationship("Review", back_populates="product")
    seller = db.relationship("User", back_populates="products")
    users = db.relationship("User", secondary="favorites",
                            back_populates="fav_products")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": str(self.price),
            "sellerId": self.seller_id,
            "categoryId": self.category_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
