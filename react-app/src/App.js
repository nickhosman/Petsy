import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductIndex from "./components/Product/ProductIndex";
import ProductDetails from "./components/Product/ProductDetails";
import ProductFormPage from "./components/Product/ProductForm";
import ProductUpdateForm from "./components/Product/ProductUpdateForm";
import ListingPage from "./components/Listing";
import Home from "./components/Home";
import Search from "./components/Search/Search";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
console.log(searchInput)
  return (
    <>
      <Navigation isLoaded={isLoaded} searchInput={searchInput} setSearchInput={setSearchInput} />
      {isLoaded && (
        <Switch>
          <Route exact path='/users/:userId/products'>
            <ListingPage />
          </Route>
          <Route exact path='/products'>
            <ProductIndex/>
          </Route>
          <Route exact path='/products/new'>
            <ProductFormPage/>
          </Route>
          <Route exact path='/products/:productId/edit'>
            <ProductUpdateForm/>
          </Route>
          <Route exact path='/products/:productId'>
            <ProductDetails/>
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path={`/search`} >
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </Route>
          <Route path="/">
            <Home searchInput={searchInput}  setSearchInput={setSearchInput} />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
