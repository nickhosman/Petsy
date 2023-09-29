# "product_tags"
from .db import db, add_prefix_for_prod, environment, SCHEMA

product_tags = db.Table(
    "product_tags",

    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("products.id")),
        primary_key=True
    ),
    db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("tags.id")),
        primary_key=True
    )
)
if environment == "production":
    product_tags.schema = SCHEMA
