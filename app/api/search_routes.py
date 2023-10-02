from flask import Blueprint,request
from app.models import Category, db
from flask_login import login_required
from app.models import Product, Category, Tag, product_tags
from sqlalchemy import or_

search_routes = Blueprint("search", __name__)

@search_routes.route("/")
def search():
  q = request.args.get("q")
  if q:

    result = (Product.query
              .join(Category)
              .join(product_tags, Product.id == product_tags.c.product_id)
              .join(Tag, Tag.id == product_tags.c.tag_id)
              .filter(or_(Product.name.ilike(f'%{q}%'), Category.name.ilike(f'%{q}%'),Tag.name.ilike(f'%{q}%')))).limit(100).all()

    search_dict={}
    for product in result:
        data=product.to_dict()
        images = product.product_images
        reviews = product.reviews
        seller = product.seller
        data['seller'] = seller.to_dict()
        total_review = len(reviews)
        if total_review == 0:
            data["averageRating"] = 'No reviews'
        else:
            average_rating = sum([review.stars for review in reviews]) / total_review
            data["averageRating"] = round(average_rating, 1)
        for image in images:
            if image.preview:
                data["previewImage"] = image.image_url
                break
        search_dict[str(product.id)]=data

    return {"Search":search_dict}

  else:
    result=[]
