# shopping cart
# from .db import db, add_prefix_for_prod, environment, SCHEMA

# shopping_carts = db.Table(
#     "shopping_carts",

#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("users.id")),
#         primary_key=True
#     ),
#     db.Column(
#         "product_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod("products.id")),
#         primary_key=True
#     )
# )

# if environment == "production":
#     shopping_carts.schema = SCHEMA
