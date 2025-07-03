// Frameworks & Libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  Typography,
  Button,
  Box,
  ButtonGroup,
  Breadcrumbs,
  Divider,
  Link,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Container,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../context/cartContext";

export default function MerchItem() {
  const { merchId } = useParams();
  const [merchItem, setMerchItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const merchRef = doc(db, "merch", merchId);
        const merchSnap = await getDoc(merchRef);

        if (merchSnap.exists()) {
          const data = merchSnap.data();
          setMerchItem({ id: merchSnap.id, ...data });
        } else {
          setError("Item not found");
        }
      } catch (err) {
        setError("Failed to fetch item");
        console.error("Error fetching merch item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [merchId]);

  const handleAddToCart = () => {
    const availableSizes = merchItem.sizes || merchItem.availableSizes || [];

    if (availableSizes.length > 0 && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id: `${merchItem.id}${selectedSize ? `-${selectedSize}` : ""}`,
      title: merchItem.title,
      size: selectedSize || "One Size",
      quantity: quantity,
      price: merchItem.price,
      image: merchItem.Image?.src || merchItem.image || "/placeholder.svg",
    };

    addToCart(cartItem);
    alert("Item added to cart!");
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!merchItem) {
    return (
      <Container maxWidth="lg">
        <Alert severity="info">Item not found :/</Alert>
      </Container>
    );
  }

  // Get single image from merch data
  const productImage =
    merchItem.Image?.src || merchItem.image || "/placeholder.svg";

  // Extract available sizes from merch data
  const availableSizes = merchItem.sizes || merchItem.availableSizes || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="/shop">
          Merch
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/shop/${merchItem.category}`}
        >
          {merchItem.category || "Category"}
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {merchItem.title}
        </Typography>
      </Breadcrumbs>

      <Divider sx={{ mb: 4 }} />

      <Card elevation={2}>
        <CardHeader>
          <Typography variant="h3" gutterBottom>
            {merchItem.title}
          </Typography>
        </CardHeader>

        <CardContent>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                sx={{
                  height: "500px",
                  objectFit: "contain",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                }}
                src={productImage}
                alt={merchItem.Image?.alt || merchItem.title}
              />
            </Grid>

            {/* Product Details Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2 }}>
                {/* Price */}
                <Typography variant="h4" color="primary" gutterBottom>
                  ${merchItem.price}
                </Typography>

                {/* Description */}
                {merchItem.description && (
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, color: "text.secondary" }}
                  >
                    {merchItem.description}
                  </Typography>
                )}

                {/* Size Selection */}
                {availableSizes.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Select Size:
                    </Typography>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="Size selection"
                      sx={{ flexWrap: "wrap" }}
                    >
                      {availableSizes.map((size) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "contained" : "outlined"
                          }
                          onClick={() => setSelectedSize(size)}
                          sx={{ mb: 1 }}
                        >
                          {size}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                )}

                {/* Quantity Selection */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Quantity:
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      sx={{ minWidth: "40px" }}
                    >
                      -
                    </Button>
                    <Typography
                      variant="h6"
                      sx={{ minWidth: "40px", textAlign: "center" }}
                    >
                      {quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      sx={{ minWidth: "40px" }}
                    >
                      +
                    </Button>
                  </Box>
                </Box>

                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{
                    width: "100%",
                    py: 2,
                    fontSize: "1.2rem",
                    mb: 3,
                  }}
                >
                  Add to Cart
                </Button>

                {/* Additional Product Info */}
                <Box sx={{ pt: 2, borderTop: "1px solid #e0e0e0" }}>
                  {merchItem.category && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <strong>Category:</strong> {merchItem.category}
                    </Typography>
                  )}
                  {merchItem.brand && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      <strong>Brand:</strong> {merchItem.brand}
                    </Typography>
                  )}
                  {merchItem.material && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Material:</strong> {merchItem.material}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
