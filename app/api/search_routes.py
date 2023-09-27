from flask import Blueprint,request
from app.models import Category, db
from flask_login import login_required
from app.models import Product, Category
from sqlalchemy import or_

search_routes = Blueprint("search", __name__)

@search_routes.route("/")
def search():
  q = request.args.get("q")
 
  
  if q:
    print("qqqqqqqqqqqqqqqqqqq",q)
    # print('Yoooooooooooooooooooooo',Product.query.get(category_id))
   
    # result = Product.query.join(Category).filter(Product.name.ilike(f'%{q}%').or_(Category.name.ilike(f'%{q}%'))).limit(100).all()
   
    result = Product.query.join(Category).filter(or_(Product.name.ilike(f'%{q}%'),Category.name.ilike(f'%{q}%'))).limit(100).all()
    print("resultttttttttttttttttttt",result)
    
    # print(Category.name)
    print("xxxxxxxxxxxxxxxxxxxxxx",result)
    search_dict={}
    for product in result:
        data=product.to_dict()
        images = product.product_images
        reviews = product.reviews
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
    print("working!!!!!!!!!!",search_dict)
    return {"Search":search_dict}

  else:
    result=[]
  

