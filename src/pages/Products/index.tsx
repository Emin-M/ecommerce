import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

/* Styles */
import { StyledProductsContainer } from "./style";
import { Container } from "../../components/ReusuableComponents/styles/Container.styled";

/* Components */
import Links from "./components/Links";
import ProductsBottom from "./components/ProductsBottom";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  /* Url */
  const [searchParams, setSearchParams] = useSearchParams();
  let paramsBrand = searchParams.getAll("brand");
  let paramsSort = searchParams.getAll("sort");
  let page = searchParams.get("page");

  /* Fetching Products With Debounce Algoritm */
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetch();
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [searchParams, id]);

  const fetch = () => {
    let params = { query: paramsBrand?.[0], page: page ? page : "1" };

    if (id && paramsSort?.[0]) {
      dispatch(
        fetchProducts({
          limit: 6,
          sortBy: "price",
          direction: paramsSort?.[0],
          category: [id],
          query: params.query,
          page: params.page,
        })
      );
    } else if (id && !paramsSort?.[0]) {
      dispatch(
        fetchProducts({
          limit: 6,
          query: params.query,
          page: params.page,
          category: [id],
        })
      );
    }
  };

  return (
    <StyledProductsContainer>
      <Container>
        <Links />
        <ProductsBottom />
      </Container>
    </StyledProductsContainer>
  );
};

export default Products;
