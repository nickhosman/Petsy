from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags(all_products):
    tags = [
        Tag(name='Toy', products=[all_products[0], all_products[15], all_products[14], all_products[16], all_products[17], all_products[18], all_products[19]]),
        Tag(name='Food-Themed', products=[all_products[0], all_products[18]]),
        Tag(name='Clothing', products=[all_products[3], all_products[13], all_products[20], all_products[26], all_products[30], all_products[31], all_products[32], all_products[33], all_products[34], all_products[35]]),
        Tag(name='Hand-Crafted', products=[all_products[1], all_products[10]]),
        Tag(name='Halloween', products=[all_products[1], all_products[2], all_products[10], all_products[12], all_products[21], all_products[22], all_products[23], all_products[24], all_products[25]]),
        Tag(name='Cute', products=[all_products[1], all_products[12], all_products[16], all_products[17], all_products[25], all_products[26]]),
        Tag(name='Funny', products=[all_products[2], all_products[10], all_products[21], all_products[22], all_products[23]]),
        Tag(name='Aquarium', products=[all_products[4], all_products[5], all_products[11], all_products[20]]),
        Tag(name='Home Decor', products=[all_products[4], all_products[5], all_products[11], all_products[20]]),
        Tag(name='Exotic', products=[all_products[6], all_products[7], all_products[15]]),
        Tag(name='Garden', products=[all_products[5], all_products[11]]),
        Tag(name='All-Natural', products=[all_products[8], all_products[9]]),
        Tag(name='Organic', products=[all_products[9]]),
        Tag(name='DIY', products=[all_products[11]]),
        Tag(name='Fashion', products=[all_products[3], all_products[13], all_products[33], all_products[34], all_products[35]]),
        Tag(name='Snake', products=[all_products[14]]),
        Tag(name='Treat', products=[all_products[8], all_products[9], all_products[27], all_products[28], all_products[29]]),
        Tag(name='Homemade', products=[all_products[8], all_products[9], all_products[28], all_products[29]]),
    ]

    db.session.add_all(tags)
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
