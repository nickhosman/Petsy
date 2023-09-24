from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags(all_products):
    tags = [
        Tag(name="Toy", products=[all_products[0]]),
        Tag(name="Food-Themed", products=[all_products[0]]),
        Tag(name="Clothing", products=[all_products[1]]),
        Tag(name='Hand-Crafted', products=[all_products[1]]),
        Tag(name='Halloween', products=[all_products[1]]),
        Tag(name='Cute', products=[all_products[1]]),
        Tag(name="Clothing", products=[all_products[2]]),
        Tag(name="Costume", products=[all_products[2]]),
        Tag(name="Halloween", products=[all_products[2]]),
        Tag(name="Funny", products=[all_products[2]]),
        Tag(name='Clothing', products=[all_products[3]]),
        Tag(name='Fashion', products=[all_products[3]]),
        Tag(name='Aquarium', products=[all_products[4]]),
        Tag(name='Home Decor', products=[all_products[4]]),
        Tag(name='Aquarium', products=[all_products[5]]),
        Tag(name='Home Decor', products=[all_products[5]]),
        Tag(name='Garden', products=[all_products[5]]),
        Tag(name='Exotic', products=[all_products[6]]),
        Tag(name='Exotic', products=[all_products[7]]),
        Tag(name='Treat', products=[all_products[8]]),
        Tag(name='Homemade', products=[all_products[8]]),
        Tag(name='All-Natural', products=[all_products[8]]),
        Tag(name='Treat', products=[all_products[9]]),
        Tag(name='Homemade', products=[all_products[9]]),
        Tag(name='Organic', products=[all_products[9]]),
        Tag(name='All-Natural', products=[all_products[9]]),
        Tag(name='Clothing', products=[all_products[10]]),
        Tag(name='Costume', products=[all_products[10]]),
        Tag(name='Funny', products=[all_products[10]]),
        Tag(name='Halloween', products=[all_products[10]]),
        Tag(name='Hand-Crafted', products=[all_products[10]]),
        Tag(name='DIY', products=[all_products[11]]),
        Tag(name='Aquarium', products=[all_products[11]]),
        Tag(name='Home Decor', products=[all_products[11]]),
        Tag(name='Garden', products=[all_products[11]]),
        Tag(name='Clothing', products=[all_products[12]]),
        Tag(name='Cute', products=[all_products[12]]),
        Tag(name='Halloween', products=[all_products[12]]),
        Tag(name='Clothing', products=[all_products[13]]),
        Tag(name='Fashion', products=[all_products[13]]),
        Tag(name='Toy', products=[all_products[14]]),
        Tag(name='Snake', products=[all_products[14]]),
        Tag(name='Toy', products=[all_products[15]]),
        Tag(name='Exotic', products=[all_products[15]]),
        Tag(name='Toy', products=[all_products[16]]),
        Tag(name='Cute', products=[all_products[16]]),
        Tag(name='Toy', products=[all_products[17]]),
        Tag(name='Cute', products=[all_products[17]]),
        Tag(name='Toy', products=[all_products[18]]),
        Tag(name='Food-Themed', products=[all_products[18]]),
        Tag(name='Toy', products=[all_products[19]]),
        Tag(name='Hand-Crafted', products=[all_products[20]]),
        Tag(name='Aquarium', products=[all_products[20]]),
        Tag(name='Home Decor', products=[all_products[20]]),
        Tag(name='Clothing', products=[all_products[21]]),
        Tag(name='Halloween', products=[all_products[21]]),
        Tag(name='Funny', products=[all_products[21]]),
        Tag(name='Clothing', products=[all_products[22]]),
        Tag(name='Halloween', products=[all_products[22]]),
        Tag(name='Funny', products=[all_products[22]]),
        Tag(name='Clothing', products=[all_products[23]]),
        Tag(name='Halloween', products=[all_products[23]]),
        Tag(name='Funny', products=[all_products[23]]),
        Tag(name='Clothing', products=[all_products[24]]),
        Tag(name='Halloween', products=[all_products[24]]),
        Tag(name='Clothing', products=[all_products[25]]),
        Tag(name='Halloween', products=[all_products[25]]),
        Tag(name='Cute', products=[all_products[25]]),
        Tag(name='Clothing', products=[all_products[26]]),
        Tag(name='Halloween', products=[all_products[26]]),
        Tag(name='Cute', products=[all_products[26]]),
        Tag(name='Treat', products=[all_products[27]]),
        Tag(name='Treat', products=[all_products[28]]),
        Tag(name='Homemade', products=[all_products[28]]),
        Tag(name='Treat', products=[all_products[29]]),
        Tag(name='Homemade', products=[all_products[29]]),
        Tag(name='Clothing', products=[all_products[30]]),
        Tag(name='Clothing', products=[all_products[31]]),
        Tag(name='Clothing', products=[all_products[32]]),
        Tag(name='Clothing', products=[all_products[33]]),
        Tag(name='Clothing', products=[all_products[34]]),
        Tag(name='Clothing', products=[all_products[35]]),
        Tag(name='Fashion', products=[all_products[35]])
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
