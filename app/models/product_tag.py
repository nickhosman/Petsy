# "product_tags"
from .db import db

product_tags = db.Table(
    "product_tags",
    db.Column(
        "product_id",
        db.Integer,
        db.ForeignKey("products.id"),
        primary_key=True
    ),
    db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey("tags.id"),
        primary_key=True
    )
)
