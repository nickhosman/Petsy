import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { fetchAllCategories } from "../../store/category";
import { fetchAllProducts } from "../../store/product";
import ProductsSelection from "./ProductsSelection/ProductsSelection";
import Trending from "./Trending/Trending";
import { useSearchContext } from "../../context/Search";
import Tooltip from "../Tooltip/Tooltip";
import Loader from "../Loader";
import { thunkLoadCart } from "../../store/cart";

const Home = ({ searchInput, setSearchInput }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isNavigated, setIsNavigated] = useState(false);
    const [filterCategoryId, setFilterCategoryId] = useState(null);
    const sessionUser = useSelector((state) => state.session.user);
    const [loading, setLoading] = useState(true);

    // GET ALL CATEGORIES
    const allCategories = useSelector((state) =>
        state.categories.Categories &&
        Object.values(state.categories.Categories).length
            ? state.categories.Categories
            : {}
    );

    const productObj = useSelector((state) =>
        state.products.Products && Object.values(state.products.Products).length
            ? state.products.Products
            : {}
    );

    const allProducts = Object.values(productObj);
    const categoryArr = Object.values(allCategories);

    const handleViewAllProducts = (e) => {
        e.preventDefault();
        history.push(`/products`);
    };

    const handleGoToBanner = (e) => {
        e.preventDefault();
        history.push(`/search?q=Halloween`);
    };

    const handleGoToCategory = (e) => {
        e.preventDefault();
        if (!isNavigated) {
            let targetDiv = e.target;
            while (targetDiv) {
                if (targetDiv.className === "category-card" && targetDiv.id) {
                    setSearchInput(targetDiv.id);
                    // setItemCategoryId()
                    history.push(`/search?q=${targetDiv.id}`);
                    setIsNavigated(true);
                    break;
                }
                targetDiv = targetDiv.parentElement;
            }
            const name = targetDiv.id;
            let filterId;
            categoryArr.forEach((categoryObj) => {
                if (categoryObj.name === name) {
                    filterId = categoryObj.id;
                    return;
                }
            });
            if (filterId) {
                setFilterCategoryId(filterId);
            }
        }
    };

    // Our Selection Section
    const selectedProductIds = [2, 18, 6, 26, 10, 23];
    const productsInSelection = allProducts.filter(product =>
        selectedProductIds.includes(product.id)
    );
    // for (let i = 0; i < 10; i++) {
    //   if (productsInSelection.length < 6) {
    //   const randomIdx = Math.floor(Math.random() * allProducts.length);

    //   const selectRandomProduct = allProducts[randomIdx];
    //   if (!productsInSelection.includes(selectRandomProduct)) {
    //     productsInSelection.push(selectRandomProduct);
    //   }
    //   }
    // }
    // Trending Section
    const productsInTrending = [];
    for (let i = 0; i < 20; i++) {
        if (productsInTrending.length < 10) {
            const randomIdx = Math.floor(Math.random() * allProducts.length);
            const selectRandomProduct = allProducts[randomIdx];
            if (!productsInTrending.includes(selectRandomProduct)) {
                productsInTrending.push(selectRandomProduct);
            }
        }
    }

    useEffect(() => {
        const filteredItems = allProducts.filter(
            (product) => product.categoryId === filterCategoryId
        );
    }, [filterCategoryId, allProducts]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(fetchAllCategories());
                await dispatch(fetchAllProducts());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    if (!Object.values(allCategories).length) {
        return null;
    }

    if (loading) return <Loader />;
    return (
        <div className="home-wrapper">
            {sessionUser && (
                <p className="homepage-userwelcome">
                    {" "}
                    <span>Welcome back,</span>{" "}
                    <strong className="underline-name">
                        {sessionUser.firstName}
                    </strong>
                    !
                </p>
            )}
            <div className="home-banner">
                <div id='banner-upto'>Up to 40% off</div>
                <div id='banner-holiday'>The Holiday Sales Event is here!</div>
                <button  onClick={handleGoToBanner} id='banner-button'>Shop now</button>
                <div id='banner-terms'>Participating sellers only. Terms apply.</div>
            </div>
            <div id="tag-div">
                <div id="tag-text">
                    <NavLink
                        style={{ textDecoration: "none" }}
                        exact
                        to="/search?q=Halloween"
                    >
                        <h3>The Halloween Shop</h3>
                    </NavLink>
                    <NavLink
                        style={{ textDecoration: "none" }}
                        exact
                        to="/search?q=Clothing"
                    >
                        <h3>Clothing</h3>
                    </NavLink>
                    <NavLink
                        style={{ textDecoration: "none" }}
                        exact
                        to="/search?q=Toy"
                    >
                        <h3>Toys</h3>
                    </NavLink>
                    <NavLink
                        style={{ textDecoration: "none" }}
                        exact
                        to="/search?q=Treat"
                    >
                        <h3>Treats</h3>
                    </NavLink>
                </div>
            </div>
            <div id="category-div">
                <div
                    className="category-card"
                    id="Dog"
                    onClick={handleGoToCategory}
                >
                    <div className="category-img-card">
                        <img
                            id="category-dog-img"
                            src="https://i.ibb.co/1MXKL6k/F7-OCo-A2-Xc-AAa-R5-A.jpg"
                            alt="Picture_of_Dog"
                        />
                    </div>
                    <p>For Dogs</p>
                </div>
                <div
                    className="category-card"
                    id="Cat"
                    onClick={handleGoToCategory}
                >
                    <div className="category-img-card">
                        <img
                            id="category-cat-img"
                            src="https://pbs.twimg.com/media/F6CzEK5WQAAOc8t?format=jpg"
                            alt="Picture_of_Cat"
                        />
                    </div>
                    <p>For Cats</p>
                </div>

                <div
                    className="category-card"
                    id="Reptile"
                    onClick={handleGoToCategory}
                >
                    <div className="category-img-card">
                        <img
                            id="category-reptile-img"
                            src="https://i.etsystatic.com/17565181/r/il/96bc4d/3117994707/il_794xN.3117994707_v7vd.jpg"
                            alt="Picture_of_Reptile"
                        />
                    </div>
                    <p>For Reptiles</p>
                </div>
                <div
                    className="category-card"
                    id="Aquatic"
                    onClick={handleGoToCategory}
                >
                    <div className="category-img-card">
                        <img
                            id="category-aquatic-img"
                            src="https://i.etsystatic.com/31903230/r/il/379794/3621076408/il_794xN.3621076408_jwkd.jpg"
                            alt="Picture_of_Aquatic"
                        />
                    </div>
                    <p>For Aquatic</p>
                </div>
                <div
                    className="category-card"
                    id="Others"
                    onClick={handleGoToCategory}
                >
                    <div className="category-img-card">
                        <img
                            id="category-guineapig-img"
                            src="https://i.etsystatic.com/27232651/r/il/5b7220/4621311834/il_794xN.4621311834_y1yw.jpg"
                            alt="Picture_of_Guinea_Pig"
                        />
                    </div>
                    <p>Others</p>
                </div>
                <div id="view-all-div" onClick={handleViewAllProducts}>
                    <p>View All</p>
                    <p>
                        <i class="fa-solid fa-arrow-right fa-sm"></i>
                    </p>
                </div>
            </div>
            <div id="shop-selections-div">
                <h2>
                    Shop Our Selections{" "}
                    <i class="fa-solid fa-arrow-right fa-2xs selection-arrow"></i>{" "}
                </h2>
                <p className="selection-curation">
                    Curated collections hand-picked by Petsy creators
                </p>
                <div id="our-selection-div">
                    {productsInSelection.map((product) => (
                        <ProductsSelection product={product} />
                    ))}
                </div>
            </div>
            <div id="trending-section">
                <div className="trending-text">
                    <h2>Trending:</h2>
                    <p>Swipe these up fast before they're gone!</p>
                </div>
                <div id="trending-div">
                    {productsInTrending.map((product) => (
                        <Tooltip content={product?.name} direction="top">
                            <Trending product={product} />
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
