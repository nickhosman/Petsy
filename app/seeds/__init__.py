from flask.cli import AppGroup
from .users import seed_users, undo_users
from app.models.db import db, environment, SCHEMA
from .categories import seed_categories, undo_categories
from .favorites import seed_favorite_products, undo_favorite_products
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .product_images import seed_productimages, undo_productimages
from .tags import seed_tags, undo_tags
from .product_tags import seed_product_tags, undo_product_tags
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_product_tags()
        undo_tags()
        undo_favorite_products()
        undo_productimages()
        undo_reviews()
        undo_products()
        undo_categories()
        undo_users()
    seed_users()
    seed_categories()
    seed_products()
    seed_productimages()
    seed_reviews()
    seed_favorite_products()
    seed_tags()
    seed_product_tags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_product_tags()
    undo_tags()
    undo_favorite_products()
    undo_productimages()
    undo_reviews()
    undo_products()
    undo_categories()
    undo_users()
    # Add other undo functions here
