from flask import Blueprint,request
from app.models import Category, db
from flask_login import login_required
from app.models import Product
from app.models import Category

search_routes = Blueprint("search", __name__)

@search_routes.route("/")
def search():
  q = request.args.get("q")

 

  if q:
    result = Product.query.filter(Product.name.ilike(f'%{q}%'), Category.name.ilike(f'%{q}%')).order_by(Category.name.desc()).limit(100).all()
    search_dict={}
    for product in result:
        data=product.to_dict()
        search_dict[str(product.id)]=data
    print(search_dict)
    return {"Search":search_dict}

  else:
    result=[]
  

