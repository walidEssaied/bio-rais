import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import { setItems } from "../../state";
import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";

export default function Category() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  async function getItems() {
    const items = await fetch(
      `http://localhost:1337/api/items?filters[category][id][$eq]=${categoryId}&populate=*`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  const [category, setCategory] = useState(false);
  async function getCategories() {
    const categories = await fetch("http://localhost:1337/api/categories/"+categoryId, {
      method: "GET",
    });
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategory(categoriesJson.data));
  }


  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  console.log({ items });

  return (
    <Container maxWidth="md">
      <Stack margin="90px auto" p={4}>
        <Typography variant="h4" color="GrayText">
          List des produits dans la catégorie{" "}
          <Typography variant="h4" fontWeight={theme => theme.typography.fontWeightBold} sx={{display: "inline-block"}} color="black">{category.attributes?.name}</Typography>
        </Typography>
        <Stack p={4}>
          {items && items.length > 0
            ? items.map((item, index) => {
                return <Item item={item} key={index} />;
              })
            : "No product"}
        </Stack>
      </Stack>
    </Container>
  );
}
