import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Link, Stack, Typography } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades, theme } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(false);

  async function getCategories() {
    const categories = await fetch("http://localhost:1337/api/categories", {
      method: "GET",
    });
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategories(categoriesJson.data));
  }

  useEffect(() => {
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={() => setOpen(!open)} sx={{ color: "black" }}>
          <MenuOutlined />
        </IconButton>
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          BIO RAIS
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box>
      {open && (
        <Stack
          width={220}
          height="100vh"
          position="absolute"
          bgcolor="#dda"
          boxShadow={theme.shadows[2]}
          p={4}
          sx={{
            top: 45,
            zIndex: 11,
          }}
        >
          <Typography variant="h2" color="AppWorkspace">
            Menu
          </Typography>
          <Typography variant="h5" color="AppWorkspace">
            Categories
          </Typography>
          <Box>
            {categories &&
              categories.map((item, index) => (
                <Typography key={index}>
                  <Link href={`/category/${item.id}`}>
                    {item.attributes.name}
                  </Link>
                </Typography>
              ))}
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default Navbar;
