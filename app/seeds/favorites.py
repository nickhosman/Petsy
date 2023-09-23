# from ..models import db, favorites, environment, SCHEMA
# from sqlalchemy.sql import text

# def seed_favorite_products():
#   favorite_products = [
#     favorites(userId = 1, productId = 23),
#     favorites(userId = 1, productId = 22),
#     favorites(userId = 1, productId = 21),
#     favorites(userId = 1, productId = 10),
#     favorites(userId = 2, productId = 22),
#     favorites(userId = 2, productId = 23),
#     favorites(userId = 3, productId = 21),
#     favorites(userId = 3, productId = 22),
#     favorites(userId = 4, productId = 20),
#     favorites(userId = 4, productId = 21),
#     favorites(userId = 5, productId = 19),
#     favorites(userId = 5, productId = 20),
#     favorites(userId = 6, productId = 18),
#     favorites(userId = 6, productId = 19),
#     favorites(userId = 7, productId = 18),
#     favorites(userId = 7, productId = 17),
#     favorites(userId = 8, productId = 17),
#     favorites(userId = 8, productId = 16),
#     favorites(userId = 9, productId = 15),
#     favorites(userId = 10, productId = 2),
#     favorites(userId = 11, productId = 1),
#     favorites(userId = 12, productId = 4),
#     favorites(userId = 13, productId = 5),
#     favorites(userId = 14, productId = 2),
#     favorites(userId = 15, productId = 3),
#     favorites(userId = 16, productId = 6),
#     favorites(userId = 17, productId = 7),
#     favorites(userId = 18, productId = 8),
#     favorites(userId = 19, productId = 9),
#     favorites(userId = 20, productId = 10),
#   ]
#   db.session.add_all(favorite_products)
#   db.session.commit()

# def undo_favorite_products():
#   if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
#   else:
#         db.session.execute(text("DELETE FROM favorites"))

#   db.session.commit()
