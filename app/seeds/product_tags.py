# from app.models import db, product_tags, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_product_tags():
#   product_tag = product_tags(product_id=1, tag_id=1)

#   db.session.add(product_tag)
#   db.session.commit()

# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_product_tags():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.product_tags RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM product_tags"))

#     db.session.commit()
