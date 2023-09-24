from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags(all_products):
    tag1 = Tag(
        name="Clothing",
        products=[all_products[1]]
    )
    tag2 = Tag(
        name="Toy",
        products=[all_products[0]]
    )

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_tags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
