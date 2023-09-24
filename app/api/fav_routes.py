from flask import Blueprint
from app.models import Product, User, db
from flask_login import login_required,current_user

favorite_routes = Blueprint("favorites", __name__)

@favorite_routes.route("/<int:productid>",methods=["DELETE"])
@login_required
def delete_favorite(productid):
    """
    delete a favorite product for a user
    """
    product=Product.query.get(productid)
    if not product :
        return {'errors': "Product not found"}, 404
    if current_user not in product.users:
       return {"error": 'Favorite product not found'}, 401
  
    product.users.remove(current_user)
    db.session.commit()

    return {"message":"Successfully deleted the favorite product."}
    
