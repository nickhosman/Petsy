from ..models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
  categories = []
  names = ["Dog", "Cat", "Aquatic", "Reptile", "Others"]

  for i in range(len(names)):
    category = Category(name=names[i])
    categories.append(category)

  db.session.add_all(categories)
  db.session.commit()

def undo_categories():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM categories"))
  db.session.commit()
