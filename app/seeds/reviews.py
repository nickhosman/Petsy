from ..models import db, Review, environment, SCHEMA
from faker import Faker
from sqlalchemy.sql import text

fake = Faker()

def seed_reviews():

    reviews = []

    # data = (productId, userId, stars, details)
    data = [
        (1, 20, 5, "As someone who loves eating sushi... being able to buy my dog this was hillarious."),
        (1, 19, 5, "I think my dog loves this toy more than I love sushi! Amazing toy!"),
        (2, 18, 4, "The lion outfit is very cute, but the sizing is slightly inaccurate."),
        (2, 17, 5, "My cat looks sooooo cute in this! He looks so majestic."),
        (3, 10, 3, "The quality of the shirt isn't great. The glasses are also way too big, can't imagine it fits on any cat."),
        (3, 9, 4, "I've been looking for a Harry Potter themed outfit for my cat! The cloak is a nice touch."),
        (4, 1, 2, "The actual hoodie doesn't look nearly as good as the picture. Faded colors and material quality feels cheap."),
        (4, 2, 2, "For an outfit that's supposed to be designer themed... the quality sure doesn't meet that standard."),
        (5, 16, 4, "I bought this for my sons new fishes and they absolutely love it!"),
        (5, 14, 4, "The price is kinda expensive, but the quality of this aquarium is impressive."),
        (6, 20, 5, "I do not regret adding this to my home. Not only does my small goldfish love it, but it makes for really nice home decor"),
        (6, 2, 5, "One of the most aesthetically pleasing fishbowls"),
        (6, 6, 5, "I bought this for my home office and it's gorgeous! My little fish friend now resides in it too."),
        (7, 1, 1, "The description states this pouch is double layered and allows for easy access. My hedgehog ripped this apart in less than a day."),
        (7, 11, 2, "For some reason my hedgie doesn't like this pouch. It's also very small."),
        (7, 12, 1, "The pouch is VERY small... like A LOT smaller than advertised."),
        (8, 2, 2, "This hammock isn't very stable. Any weight on it and it flips around."),
        (8, 10, 2, "My hammock came with a tear on the side. I will be requesting a refund."),
        (8, 9, 2, "As an owner of a pet squirrel, find stuff like is rare. Unfortunately, it's not as great as I thought it'd be."),
        (9, 3, 5, "Whatever is in these I have to know... my puppy gobbles them up very fast."),
        (9, 2, 5, "My corgi is usually a very picky eater, but he loves these!"),
        (9, 15, 5, "I'm always on the lookout for healthy, natural dog treats. Thank you!"),
        (10, 4, 5, "If your cat is a picky eater, try giving them one of these. It's worked wonders on my boy!"),
        (10, 5, 4, "A great treat with very healthy ingredients!"),
        (10, 16, 5, "I've been looking for organic treats to give to my cat, we decided to try these and she loves them!"),
        (11, 3, 4, "My lizard looks like he could be in JAWS wearing this."),
        (11, 10, 4, "I love the idea of this outfit!! SHARRRRK!"),
        (11, 6, 4, "I've regretted buying a lot of things... this is not one of them."),
        (12, 20, 3, "When the garden arrived I was quite shocked. I expected it to be much bigger."),
        (12, 1, 1, "The pictures are extremely misleading. Putting a fish in this would be equivalent to torture."),
        (12, 2, 2, "Pictures are extremely misleading, only buy if you plan on using it for home decor"),
        (13, 5, 5, "HOLY THIS IS ADORABLE!!!!!"),
        (13, 13, 5, "Seller was very nice and responded to my questions really fast. My cat looks so good in this"),
        (13, 18, 5, "I wish I could purchase one of these to wear myself so I can match with my kitty."),
        (14, 2, 3, "Tiny pieces of material on this sweater falls off whenever my dog moves around in it."),
        (14, 18, 3, "My dog looks stylish in this, but I wish the material was made from something less flimsy"),
        (14, 19, 4, "Great little cozy sweater!"),
        (15, 9, 4, "The playground looks WAY bigger in person. Awesome toy, thank you!"),
        (15, 8, 3, "Bought this for my new pet snake and after a few days he doesn't play with it anymore."),
        (16, 1, 1, "Are you kidding me? What is this?"),
        (17, 12, 5, "My cat plays with these all day!"),
        (17, 11, 5, "Beyond precious! Item arrived quickly and exactly as I had hoped. Perfect gift for our cat, Lynx. Great transaction from this shop!"),
        (17, 10, 5, "Originally bought for the cuteness factor. Turns out my cat LOVES them"),
        (18, 9, 5, "So cute! I asked if these could be made without catnip for my kitty, and I was very quickly and easily accommodated."),
        (18, 4, 5, "so cute and just the right size for a six month old kitten!!!!"),
        (18, 3, 5, "Arrived quickly and is very cute. My cats love it!"),
        (19, 7, 4, "I ordered 6 of these and the cupcakes are well made, very colorful!"),
        (19, 6, 5, "I absolutely love this toy! So cute, and my big and small dogs love them!!"),
        (19, 5, 4, "these are adorable. my dogs lost interest in them after a few days, but still adorable nonetheless."),
        (20, 1, 2, "Description says 12 spring toys... mine came with 11. Will I be getting payment back for the 1 missing toy?"),
        (20, 3, 3, "The springs make these toys bounce very high! Unfortunately my cat won't play with it longer than 10 minutes."),
        (20, 12, 3, "For whatever reason my new kitty loses interest with these very fast."),
        (21, 14, 5, "This was a gamechanger for my home aquarium. Seeing my fish swim upwards through the bridge is awesome."),
        (22, 2, 5, "My pet lizard: run you fools!!!"),
        (22, 5, 5, "The outfit fits PERFECT on my lizard Henry. I have enrolled him in magic school and am very proud."),
        (23, 6, 4, "The quality can be a little better, but it's really cute!"),
        (23, 14, 4, "Outside of the googly eyes feel sorta flimsy my caiman looks adorable in it!"),
        (23, 15, 4, "My lizard became the owner of the Krusty Krab.")
    ]

    for productId, userId, stars, details in data:
        created_at_date = fake.date_time_between(start_date='-1y', end_date='today')
        updated_at_date = fake.date_time_between(start_date=created_at_date, end_date='today')

        review = Review(product_id=productId, user_id=userId, stars=stars, details=details, created_at=created_at_date, updated_at=updated_at_date)
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

def undo_reviews():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
        db.session.execute(text("DELETE FROM reviews"))
  db.session.commit()
