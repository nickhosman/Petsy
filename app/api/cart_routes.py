from flask import Blueprint
from app.models import Product, User, db
from flask_login import login_required,current_user

cart_routes = Blueprint("carts", __name__)

@cart_routes.route("/<int:productid>",methods=["DELETE"])
@login_required
def delete_cart_item(productid):
    """
    delete a product for a user shopping cart
    """
    product=Product.query.get(productid)
    if not product :
        return {'errors': "Product not found"}, 404
    print('xxxxxxxxxxxx',current_user)
    print('yyyyyyyyyyyyyyyy',product.cart_users)
    if current_user not in product.cart_users:
       return {"error": 'cart product not found'}, 401

    product.cart_users.remove(current_user)
    db.session.commit()

    return {"message":"Successfully deleted product from shopping cart."}
