import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { Link } from "react-router-dom";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [categories, setCategories] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?limit=4&populate=image",
      { method: "GET" }
    );
    const itemsJson = await items.json();
    console.log(itemsJson.data);
    dispatch(setItems(itemsJson.data));
  }

  async function getCategories() {
    const categories = await fetch("http://localhost:1337/api/categories", {
      method: "GET",
    });
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategories(categoriesJson.data));
  }

  useEffect(() => {
    getItems();
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Categories</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        my={8}
      >
        {categories &&
          categories.map((item, index) => (
            <Box
              key={index}
              component={Link}
              to={`/category/${item.id}`}
              sx={{
                backgroundColor: "#00cbb5",
                p: 2,
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[1],
                textDecoration: "none",
                color: "white",
                textAlign: "center"
              }}
            >
              <Typography variant="h4" fontWeight={theme => theme.typography.fontWeightBold}>{item.attributes.name}</Typography>
            </Box>
          ))}
      </Box>
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        my={8}
      >
        {items && items.map((item) => (
          <Item item={item} key={`${item.name}-${item.id}`} />
        ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
