from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, db, Review, User, Tag, product_tags,favorites
from app.forms import ProductForm,TagForm, ProductImageForm, ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

product_routes = Blueprint("products", __name__)

@product_routes.route("/")
def get_products():
    """
    Get all products
    """
    all_products = Product.query.all()
    product_dict = {}
    for product in all_products:
        data = product.to_dict()
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
        product_dict[str(product.id)] = data
    return {"Products": product_dict}

@product_routes.route("/<int:productId>/reviews", methods=['POST'])
@login_required
def post_review(productId):
    """
    Create a review for a product
    """
    product = Product.query.get(productId)
    user = User.query.get(current_user.id)
    print(user)
    if not product:
        return {"error": "Product not found"}, 404

    if product.seller_id == user.id:
        return {"error": "User cannot review a product they listed"}, 403

    existing_review = Review.query.filter_by(product_id=productId, user_id=user.id).first()
    if existing_review:
        return {"error": "User already has a review for this product"}, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            stars = form.data['stars'],
            details = form.data['details'],
            product_id = productId,
            user_id = user.id
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:productId>/images", methods=['POST'])
@login_required
def post_product(productId):
    """
    Create an image for a product
    """
    product = Product.query.get(productId)
    if not product:
        return {'errors': "Product not found"}, 404

    if product.seller_id != current_user.id:
       return {"error": 'Unauthorized'}, 401

    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_image = ProductImage(
            preview = form.data['preview'],
            image_url = form.data['image_url'],
            product_id = productId
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:productId>/tags", methods=['POST'])
@login_required
def post_tags(productId):
    """
    Add tags to a product
    """
    product = Product.query.get(productId)
    # print("zzzzzzzz", product)
    if not product:
        return {"errors": "Product not found"}, 404

    # print("rrrrrrrrr", request.get_json())
    new_tags = request.get_json()['name']
    # print("----------", new_tags)

    tag_obj_list = [Tag.query.get(int(tag_id)) for tag_id in new_tags]

    # print("AAAAAAAAAAA", tag_obj_list)
    product.all_tags = tag_obj_list
    db.session.commit()
    # print("lllllllll", [tag.to_dict() for tag in tag_obj_list])
    # print("bbbbbbbbbb", zip(new_tags, [tag.to_dict() for tag in tag_obj_list]))

    tag_object =  dict(zip(new_tags, [tag.to_dict() for tag in tag_obj_list]))
    return tag_object

@product_routes.route("/<int:productId>/tags/remove", methods=["PUT"])
def remove_tag(productId):
    """
    Removes a tag from a product
    """
    product = Product.query.get(productId)
    if not product:
        return {'errors': {"Product": "Product not found"}}, 404

    tag_id = request.get_json()["tagId"]
    tag = Tag.query.get(tag_id)

    if tag:
        product.all_tags.remove(tag)
        db.session.commit()
    else:
        return {"errors": {"Tag": "Tag not found"}}, 404

    return { "message": "Successfully removed tag from product."}



@product_routes.route("/<int:productId>/reviews")
def get_reviews(productId):
    """
    Gets all the reviews for a product
    """
    product = Product.query.get(productId)
    if not product:
        return {'errors': {"Product": "Product not found"}}, 404

    reviews = Review.query.filter_by(product_id=productId).all()
    review_dict = {}

    for review in reviews:
        data = review.to_dict()
        user = User.query.get(review.user_id)
        data['User'] = user.to_dict()
        review_dict[str(review.id)] = data

    return {"Reviews": review_dict}

@product_routes.route("/<int:productId>", methods=['GET'])
def get_products_detail(productId):
    """
    Returns a dictionary containing details product by its id
    """
    product = Product.query.get(productId)

    if not product:
        return {'errors': {"Product": "Product not found"}}, 404

    reviews = product.reviews
    images = product.product_images
    total_review = len(reviews)
    # tags = [tag.to_dict() for tag in product.all_tags]
    tag_dict = { tag.id: tag.to_dict() for tag in product.all_tags }
    if total_review == 0:
        average_rating = 'No reviews'
    else:
        average_rating = sum([review.stars for review in reviews]) / total_review
    data = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": float(product.price),
        "sellerId": product.seller_id,
        "categoryId": product.category_id,
        "createdAt": product.created_at,
        "updatedAt": product.updated_at,
        "totalReviews": total_review,
        "averageRating": average_rating,
        "ProductImages": [image.to_dict() for image in images],
        "Seller": product.seller.to_dict(),
        "tags": tag_dict,
    }

    return data

@product_routes.route("/new", methods=["POST"])
@login_required
def create_product():
    """
    Adds a product to the database
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name = form.data["name"],
            description = form.data["description"],
            price = form.data["price"],
            seller_id = current_user.id,
            category_id = form.data["category_id"]
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:productId>", methods=["PUT"])
@login_required
def edit_product(productId):
    """
    Updates a product in the database
    """
    #filter_by returns base query class obj that cannot be serialized into JSON, doing .first()
    #will grab the dictionary that can be serialized into JSON
    product = Product.query.filter_by(id=productId).first()
    if product.seller_id != current_user.id:
       return {"error": 'Unauthorized'}, 401

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product.name = form.data["name"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        product.category_id = form.data["category_id"]

        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@product_routes.route("/<int:productId>", methods=["DELETE"])
@login_required
def delete_product(productId):
    """
    Delete a product
    """
    product = Product.query.get(productId)
    if not product :
        return {'errors': "Product not found"}, 404

    if product.seller_id != current_user.id:
       return {"error": 'Unauthorized'}, 401

    db.session.delete(product)
    db.session.commit()

    return {"message": "Successfully deleted product."}

@product_routes.route("/<int:productId>/favorites", methods=["POST"])
@login_required
def add_favorite(productId):
    """
    Add a favorite for a user
    """
    product = Product.query.get(productId)
    if product.seller_id == current_user.id:
        return {"errors": "User cannot favorite a product they have listed"}, 400
    if product in current_user.fav_products:
        return {"errors": "User already favorited product"}, 400
    product.users.append(current_user)
    db.session.commit()
    return {"message": "Successfully added to favorites"}
