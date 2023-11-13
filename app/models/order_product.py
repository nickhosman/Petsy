from .db import db, environment, SCHEMA, add_prefix_for_prod

class OrderProduct(db.Model):
    __tablename__ = 'order_products'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)

    order = db.relationship("Order", back_populates="order_products")
    product = db.relationship("Product", back_populates="order_products")
