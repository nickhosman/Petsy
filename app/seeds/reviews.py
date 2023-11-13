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
        (1, 2, 4, "My pupper can play with this toy for hours!"),
        (1, 3, 4, "I bought these for my friends dog for Christmas, a great gift idea."),
        (1, 4, 5, "Impressed by the quality considering the price."),
        (2, 18, 5, "The lion outfit is very cuteeee."),
        (2, 17, 5, "My cat looks sooooo adorable in this! He looks so majestic."),
        (2, 15, 5, "So simple, yet so amazing."),
        (2, 11, 5, "The absolute best costume for my kitty!"),
        (2, 2, 5, "I can't get over how cute this is. Would recommend!"),
        (3, 10, 3, "The quality of the shirt isn't great. The glasses are also way too big, can't imagine it fits on any cat."),
        (3, 9, 4, "I've been looking for a Harry Potter themed outfit for my cat! The cloak is a nice touch."),
        (3, 10, 4, "As a lifelong Harry Potter fan, this was a dream come true!"),
        (3, 11, 2, "The flimsy glasses came damaged on arrival."),
        (4, 1, 2, "The actual hoodie doesn't look nearly as good as the picture. Faded colors and material quality feels cheap."),
        (4, 2, 2, "For an outfit that's supposed to be designer themed... the quality sure doesn't meet that standard."),
        (4, 5, 3, "Not a bad little hoodie for my doggie!"),
        (4, 10, 4, "My little guy loves this hoodie!!"),
        (5, 16, 4, "I bought this for my sons new fishes and they absolutely love it!"),
        (5, 14, 4, "The price is kinda expensive, but the quality of this aquarium is impressive."),
        (6, 20, 5, "I do not regret adding this to my home. Not only does my small goldfish love it, but it makes for really nice home decor"),
        (6, 2, 5, "One of the most aesthetically pleasing fishbowls"),
        (6, 6, 5, "I bought this for my home office and it's gorgeous! My little fish friend now resides in it too."),
        (6, 10, 5, "Quality is fantastic! Amazing considering the price."),
        (6, 11, 5, "Very glad I chose this bonsai bowl. My frog loves it and it looks beautiful."),
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
        (10, 18, 5, "I love that the seller included the exact ingredient measurements. The perfect treat for my kitten."),
        (10, 20, 5, "You can tell these were made with high quality ingredients. 10/10 would recommend!"),
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
        (23, 15, 4, "Such a funny, cute, and well made costume for my little lizard."),
        (23, 16, 4, "One of my purchases I will never regret buying."),
        (23, 10, 4, "One of my purchases I will never regret buying."),
        (24, 20, 5, "I work at Starbucks and bought my cat this! It is soooo perfect."),
        (24, 19, 3, "The outfit only comes with an apron. Wish there was a little more than that."),
        (25, 5, 4, "Loved this for my kitty! She looks so funny LOL"),
        (25, 8, 4, "Fits perfect! Love the colors so much too!!!!"),
        (26, 2, 5, "THIS IS SO ADORABLE! I'M GONNA BUY ANOTHER ONE."),
        (26, 3, 5, "I bought this for my small puppy and it fits perfectly, especially his tiny little head!"),(26, 15, 5, "My puppy loves this so much he wears them as pajamas lol!"),
        (26, 16, 5, "Very impressed by the quality as well as how snug it fits. So Cozy."),
        (26, 20, 5, "A perfect, cute little gift for my pupper."),
        (27, 3, 5, "Love the tentacles! The quality is also tremendous considering the price!"),
        (28, 1, 1, "Purchased this for my puppy and he was throwing up for two straight days."),
        (28, 4, 1, "Something is wrong with the ingredients. My poor dog was not feeling well after eating these."),
        (29, 17, 5, "My cat LOVES these. Seriously she can't get enough!"),
        (29, 15, 5, "These look so good and my cat eats them so fast. I need more!"),
        (30, 14, 4, "I'm always cautious about buying homemade treats, but my cat loved these!"),
        (31, 12, 3, "The quality of these raincoats aren't very good."),
        (31, 11, 2, "Not bad, but not great either. You get what you pay for I guess."),
        (32, 12, 5, "Fits perfectly on my little dog!"),
        (32, 14, 5, "A little pricey, but the quality is nice and my girl loves wearing it."),
        (33, 13, 5, "The onesie fits perfectly on my cat!"),
        (34, 5, 3, "My cat has a small head so it doesn't fit as well as I'd like it too."),
        (35, 19, 5, "These sweaters are very nice quality. I bought another one!"),
        (35, 11, 5, "Pricey, but defintely worth. These are durable and very comfortable."),
        (36, 14, 5, "Now my maltese can be a hypebeast like me!"),
        (36, 19, 5, "Fits good, looks good, and the quality is insane given the price!"),
    ]

    for productId, userId, stars, details in data:
        created_at_date = fake.date_time_between(start_date='-1y', end_date='now')
        updated_at_date = fake.date_time_between(start_date=created_at_date, end_date='now')

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
