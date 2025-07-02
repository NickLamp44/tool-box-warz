// Frameworks & Libraries

// Pages & Components

// Styling

// Frameworks & Libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Container, Row, Col, Badge } from "react-bootstrap";
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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "bootstrap/dist/css/bootstrap.min.css";
// Pages & Components

// Styling

export default function MerchItem() {
  const { merchId } = useParams();
  const [merchItem, setMerchItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const merchRef = doc(db, "Merch", merchId);
        const merchSnap = await getDoc(merchRef);
        if (merchSnap.exists()) {
          setMerchItem(merchSnap.data());
        } else {
          setError("Item not found");
        }
      } catch (err) {
        setError("Failed to fetch blog");
      }
    };
    fetchItem();
  }, [merchId]);

  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  if (!merchItem)
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );

  return (
    <Container>
      {/* page tabs merch -> tshirts -> Loic Tshirt */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Merch
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
      </Breadcrumbs>
      <Divider className="my-4" />
      <Card>
        <CardHeader>
          <Typography variant="h3" gutterBottom>
            {" "}
            {merchItem.title}{" "}
          </Typography>
        </CardHeader>
        <CardMedia
          sx={{ height: "400px", objectFit: "cover" }}
          src={merchItem.Image?.src}
          alt={merchItem.Image?.alt}
          className="img-fluid w-100 rounded"
        />
        <CardContent>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>X-Small</Button>
            <Button>Small</Button>
            <Button>Medium</Button>
            <Button>Large</Button>
            <Button>X-Large</Button>
            <Button>XX-Large</Button>
          </ButtonGroup>
          {/* Choose Quantity  */}
          <Typography variant="subtitle1" mt={2}>
            Quantity:
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>

            <Typography>{quantity}</Typography>
            <Button
              variant="outlined"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </Button>
          </Box>
          <AddShoppingCartIcon />
          <Typography variant="h6">${merchItem.price}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
