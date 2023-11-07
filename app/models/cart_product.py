from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartProduct(db.Model):
    __tablename__ = 'cart_products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    cart = db.relationship("Cart", back_populates="cart_products")
    product = db.relationship("Product", back_populates="cart_products")
