from .db import db, environment, SCHEMA, add_prefix_for_prod

cart_products = db.Table(
  "cart_products",

  db.Column(
    "cart_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("carts.id")),
    primary_key=True
  ),
  db.Column(
    "product_id",
    db.Integer,
    db.ForeignKey(add_prefix_for_prod("products.id")),
    primary_key=True
  ),
  db.Column(
    "quantity",
    db.Integer,
    nullable=False,
    default=1
  )
)

if environment == "production":
    cart_products.schema = SCHEMA
