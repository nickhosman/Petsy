from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Product, db, Cart, CartProduct

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def get_cart():
  cart = Cart.query.filter_by(user_id=current_user.id).first()
  if cart:
    return jsonify(cart.to_dict()), 200
  else:
    return jsonify({'message': 'Nothing inside cart'})

@cart_routes.route('/add', methods=['POST'])
@login_required
def add_to_cart():
  """
  ADD A PRODUCT TO CART
  """
  # get data from request
  data = request.get_json()
  user_id = data.get('userId')
  product_id = data.get('productId')
  quantity = data.get('quantity')

  # find users cart, if user does not have a cart create one
  cart = Cart.query.filter_by(user_id=current_user.id).first()
  if not cart:
    cart = Cart(user_id=user_id)

  # check if cart product already exists
  cart_product = CartProduct.query.filter(cart_id=cart.id, product_id=product_id)
  # if product is already in cart, update quantity
  if cart_product:
    cart_product.quantity += quantity
  # if produc is not in cart, create cart product
  else:
    new_cart_product = CartProduct(cart_id=cart.id, product_id=product_id, quantity=quantity)
    db.session.add(new_cart_product)

  db.session.commit()
  return jsonify({'message': 'Product added to cart'}), 200

@cart_routes.route('/remove', methods=['POST'])
@login_required
def remove_from_cart():
  """
  REMOVE A PRODUCT FROM CART
  """
  # get data from request
  data = request.get_json()
  user_id = data.get('userId')
  product_id = data.get('productId')
  quantity = data.get('quantity')

  # find users cart, if cart doesnt exist... error
  cart = Cart.query.filter_by(user_id=current_user.id).first()
  if not cart:
    return jsonify({'error': 'Cart not found'}), 404

  # find cart_product
  cart_product = CartProduct.query.filter(cart_id=cart.id, product_id=product_id)
  # remove quantity from cart
  if cart_product:
    cart_product.quantity -= quantity
    # if cart quantity is zero remove it completely
    if cart_product.quantity <= 0:
      db.session.delete(cart_product)
    # otherwise update cart quantity with new quantity
    else:
      db.session.merge(cart_product)
    db.session.commit()
  # extra precaution incase product cannot be found
  else:
    return jsonify({'error': 'Product not found'}), 404
