from ..models import db, Product, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

current_date = datetime.now()


def seed_products(all_users):
    products = [
        Product(
            name="Handmade Sushi Dog Toy",
            description="Our Sushi Snuffle Dog Toy is perfect for dog's mental exercise. Dogs absolutely need metal exercise as much as physical exercise. An authentic realistic sushi roll design with avocado, egg, and salmon just like your favorite sushi. Plus, comes with unique gift wrap.",
            price=25.99,
            seller_id=1,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[10]]
        ),
        Product(
            name="Cat Lion Mane Costume",
            description="Elevate your pet's look with the Cat Lion Mane Costume, a Cat Wig Hat that adds a touch of whimsy and charm. Crafted for playful moments, this Funny Pets Cap is a Fancy Cosplay Costume perfect for Pet Parties and special occasions.",
            price=12.99,
            seller_id=1,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[9], all_users[13]]
        ),
        Product(
            name="Hogwarts Magic Pet Cloak",
            description="Hogwarts Magic Pet Cloak, Cat Cloak, Dog Cloak, Fan gifts, Unique Cat Clothes, Personalized Pet Clothes, Funny Pet Coat, Magic Cloak. Thank you for your visit. ( *^_^* )",
            price=15.99,
            seller_id=2,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[14]]
        ),
        Product(
            name="Luis Pawtton Designer Dog Hoodie",
            description="Treat pet parents around the world to a personalized dog hoodie for their four-legged family member. With 5 sizes to choose from, you're bound to deliver a great fit.",
            price=29.99,
            seller_id=3,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[11]]
        ),
        Product(
            name="Molten Glass Wood Aquarium",
            description="Unique Decorations who made from Glass that blown when hot put to Gamal Wood / Roots to create unique shape, Balinese Handicrafts. Betta Fish Aquarium, Can also be used for mini Aquarium, decoration, pot or flower vase for personal use.",
            price=400.00,
            seller_id=4,
            category_id=3,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[15], all_users[9]]
        ),
        Product(
            name="Premium Pot Bonsai Lotus Bowl",
            description="Add a touch of nature to your home with this beautiful patina-glazed ceramic pot. Perfect for creating a bonsai lotus plant, succulent garden, or even a small water garden with goldfish, this pot is ideal for your kitchen, living room, or office. With no drainage hole, this large planter can be used to create an ecosystem that will brighten your home.",
            price=32.99,
            seller_id=4,
            category_id=3,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[15], all_users[9]]
        ),
        Product(
            name="Hedgie Pouch",
            description="Exotic Only's Hedgie Pouch from the Hangouts collection is made with double-layered polar fleece material. Provide the comfiest and coziest nest pouch for your pet! Features a semi-rigid opening that holds to shape that will always allow you pet easy access inside. He'll enjoy sleeping, hiding, and exploring in his own tiny home.",
            price=12.95,
            seller_id=5,
            category_id=5,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[11], all_users[19]]
        ),
        Product(
            name="Rainbow Zebra Mini Hammock",
            description="Exotic Only's Rainbow Zebra MH combines three of our popular nest pouches from the Hangouts collection into one coordinating bundle, all at an economical price! Made with double-layered polar fleece material with pet-safe hidden seams to prevent nail snagging. Provide the comfiest and coziest nest pouch for your pet! Ideal for sugar gliders, squirrels, marmosets, and other nesting animals.",
            price=39.99,
            seller_id=5,
            category_id=5,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[11], all_users[19]]
        ),
        Product(
            name="All Natural Dog Treats",
            description="Our handmade, all natural dog treats are sure to impress your pup! We use wholesome, natural ingredients, locally sources whenever possible, and NO preservatives. We use no artificial preservatives and are registered with the Montana Department of Agriculture.",
            price=12.00,
            seller_id=6,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[2], all_users[7], all_users[17]]
        ),
        Product(
            name="Cat Grass Fish Bones Treat",
            description="100% Real & Good ingredients that you can trust.NO artificial processed, NO added Sugar, NO added Preservative, NO Chemicals, NO Added Addictive or Flavors. Ingredients include: Organic Cat Grass, Chicken Breast without Fat, goat cheese only (2oz, 20-25ct).",
            price=16.99,
            seller_id=7,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[4], all_users[18]]
        ),
        Product(
            name="Lizard Shark Costume",
            description="Transform your lizard into a cool lizard shark instantly! Lizard shark costume is a stylish decoration specially designed for lizards, making your pet lizard more unique.",
            price=12.79,
            seller_id=8,
            category_id=4,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[11], all_users[19]]
        ),
        # 12
        Product(
            name="Water Terrarium Garden",
            description="Create your own oasis of tranquility with our captivating Water Terrarium Kit. Immerse yourself in the art of cultivating a serene miniature water garden, right within the comfort of your home. Dive into the world of lush tropical plants and experience the soothing ambiance they bring.",
            price=21.99,
            seller_id=9,
            category_id=3,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[2], all_users[7], all_users[17]]
        ),
        Product(
            name="Bunny Cat Hoodie",
            description="This one-of-a-kind charm is sure to be the center of attention. The perfect item for pet lovers. This would make a great gift! If you have any questions, please feel free to contact us, we will reply you within 24 hours.",
            price=17.76,
            seller_id=10,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[0]]
        ),
        Product(
            name="Stylish Dog Sweater",
            description="Stylish dog's sweater is a perfect dog clothes item for your doggie wardrobe! It is a great birthday gift for a dog or cat or dog parents. Your puppy will love the feel of our sweater as well as it will keep them warm and cozy during cooler days and comfy in the mild weather.",
            price=50.99,
            seller_id=11,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[4], all_users[18]]
        ),
        Product(
            name="Python Playground EPIC",
            description="You asked and we delivered! Introducing our new Python Playground Epic! This is our standard playground but 4 inches wider and 2.5 inches taller! This playground comes in at about 9 inches tall and a little over 12 inches wide. This plastic structure is sure to provide your snake with plenty of different angles and entries to explore and climb around on. ",
            price=85.00,
            seller_id=12,
            category_id=4,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[4], all_users[18]]
        ),
        Product(
            name="Sisal Swing",
            description="Sisal Rope Swing is the perfect accessory for your pets exercise and fun! Watch your pet grab, climb, and play on this fun swinging circle.",
            price=18.00,
            seller_id=13,
            category_id=5,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[2], all_users[7], all_users[17]]
        ),
        # 17
        Product(
            name="Cute Toast and Egg Catnip",
            description="Set of 2 cute plush squeaky catnip toys... a happy toast and a happy egg! Great for cats of all sizes and ages! Will provide hours of fun for your furry friend.",
            price=15.00,
            seller_id=14,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[2], all_users[7], all_users[17]]
        ),
        Product(
            name="Cat Toy Frog Catnip",
            description="This toy is sized at approximately 6 inches tall and is partially hand-stitched, meaning that no two toys are exactly alike. So why wait? Give your cat the gift of playtime today and watch them bounce off the walls with excitement! Comes with a bell inside.",
            price=13.00,
            seller_id=15,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[0]]
        ),
        Product(
            name="Cupcake Dog Plushy",
            description="We all love looking at cupcakes through the bakery window, drooling and studying all the flavors, hoping you can try all of them. The Cupcake snuffle mats dont just look adorable and delicious but also stimulate your dogs brain, perfect for mental exercise! Mental exercise is as important as physical exercise!",
            price=23.50,
            seller_id=16,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1]]
        ),
        Product(
            name="12 Pack Kitten Spring",
            description="This variety pack of 12 interactive cat spring toy is the perfect chase toy for your furry friend! Extra springy and extra large, these springs roll smoother and farther than regular ones you find in the market.",
            price=10.80,
            seller_id=17,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1], all_users[3]]
        ),
        Product(
            name="The Fish Bridge",
            description="Features & Benefits: Custom made out of high quality, ultra high clarity, thick acrylic. Add real estate for your fish! The Fish Bridge gives your wetpets more room to explore. Be amazed as you watch your fish swim though air. This is the perfect showstopping piece and will blow your friends and family away.",
            price=169.00,
            seller_id=18,
            category_id=3,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1], all_users[3]]
        ),
        Product(
            name="Bearded Dragon Wizard Outfit",
            description="Halloween is coming!!! I bet your Bearded Dragon would be magical in the Wizard Cape and Wizard Hat. There will be so many parties to wear it too! The Wizard hat measure 1.5 inches wide by 2 inches tall. There is string and a sliding bead to fasten the hat onto your Beardie's head.",
            price=11.00,
            seller_id=19,
            category_id=4,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1], all_users[3]]
        ),
        Product(
            name="Crabby Dragon Outfit",
            description="Most of our precious bearded dragons can be quite judgmental, but is your dragon also a little crabby? Then this may be the perfect addition to your beardie wardrobe! A two part set with head piece and body costume. The head piece is adjustable with funny little googlie eyes. Body is made from fabric and pipe cleaners for adorable crab style!",
            price=40.00,
            seller_id=20,
            category_id=4,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1], all_users[2]]
        ),
        Product(
            name="Meowbucks Outfit",
            description="Parody Starbucks inspired outfit. All you need in life is a venti catpuchino~",
            price=19.00,
            seller_id=10,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[17], all_users[8], all_users[1]]
        ),
        Product(
            name="Meowasaur Outfit",
            description="RAWWWWWWWR!!! A dinosaur outfit for you fierce cat to wear whenever they are feeling dangerous.",
            price=19.45,
            seller_id=10,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[19], all_users[5], all_users[3]]
        ),
        Product(
            name="Pupper Mouse Costume",
            description="We are delighted to welcome you to our store! Remember to visit the store to update the latest products every day. Have a nice day and if you like this product, don't forget to rate it 5 stars. ",
            price=16.45,
            seller_id=11,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[0], all_users[10]]
        ),
        Product(
            name="Pupper Octopus Costume",
            description="Aesthetic three-dimensional octopus design, interesting hilarious clothing. There is a strong festival vibe and a straightforward, generous overall design.",
            price=13.47,
            seller_id=11,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[15], all_users[9]]
        ),
        Product(
            name="Dipped Peanut Butter Dog Bones",
            description="Every pup deserves to be pampered! Each order contains six 3 treats - 3 dipped in carob and 3 dipped in yogurt then sprinkled with unsalted roasted peanuts.",
            price=8.00,
            seller_id=6,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[9], all_users[1], all_users[8]]
        ),
        Product(
            name="Homemade Egg Treats",
            description="Homemade Pet Treats are carefully homemade in-home kitchen with limited quantity to ensure freshness & quality. 100% made with love by dog Lovers!",
            price=12.99,
            seller_id=6,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[0]]
        ),
        Product(
            name="Cat Blueberry Bites",
            description="Homemade Pet Treats are carefully homemade in-home kitchen with limited quantity to ensure freshness & quality. 100% made with love by dog Lovers!",
            price=14.99,
            seller_id=7,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[11], all_users[3], all_users[13]]
        ),
        Product(
            name="Waterproof Dog Raincoat",
            description="The waterproof polyester material can keep your dogs dry and warm in rainy and snowy days. Hole design, convenient for you to attach the leash for outdoor walking.",
            price=14.99,
            seller_id=16,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[1], all_users[3]]
        ),
        Product(
            name="Furry Zip-Up Coat",
            description="Our furry coats are thoughtfully designed with your pups comfort in mind. Recommended use with collar, or harness with adjustable zipper.",
            price=33.99,
            seller_id=16,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[10], all_users[13]]
        ),
        Product(
            name="Sphynx Cotton Onesie",
            description="Look no further for the perfect outfit for your beloved Sphynx cat! This Sphynx Cat Clothes Baby Soft Cotton Fall Winter Kitten outfit is perfect for keeping your fluffy companion warm during chilly seasons.",
            price=13.99,
            seller_id=17,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[10], all_users[13]]
        ),
        Product(
            name="Vintage Cat Hat",
            description="Vintage-style crochet hats for cats. Color is blue.",
            price=8.99,
            seller_id=17,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[5], all_users[14]]
        ),
        Product(
            name="Artisinal Cat Sweater",
            description="Our sweaters are made in small batches using high-end materials and crafted with love and care. The turtleneck design ensures that your cat will stay warm and cozy all winter long.",
            price=34.99,
            seller_id=17,
            category_id=2,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[5], all_users[14]]
        ),
        Product(
            name="Trendy Designer Essentials",
            description="This soft, breathable, and warm sweater is perfect for your furry friend all throughout Spring, Fall and Winter!",
            price=18.63,
            seller_id=11,
            category_id=1,
            created_at=current_date,
            updated_at=current_date,
            users=[all_users[15], all_users[5]]
        )
    ]

    db.session.add_all(products)
    db.session.commit()
    return products


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
