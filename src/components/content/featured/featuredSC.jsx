import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import ShowCASECard from "../showCase/showCaseCard";

const FeaturedShowCase = () => {
  const [showCases, setShowCases] = useState([]);
  const [loadingShowCases, setLoadingShowCases] = useState(true);
  const [sortType, setSortType] = useState("recent");

  const fetchShowCases = async (type) => {
    try {
      setLoadingShowCases(true);
      const orderField = type === "popular" ? "views" : "publishedDate";
      const showCaseQuery = query(
        collection(db, "showcases"),
        orderBy(orderField, "desc"),
        limit(3)
      );
      const snapshot = await getDocs(showCaseQuery);
      const fetched = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          author: data.authorName,
          date: data.publishedDate,
          category: data.tags?.[0] || "tools",
          image: data.heroImage?.src,
          previewText: data.subtitle,
        };
      });
      setShowCases(fetched);
    } catch (err) {
      console.error("🔥 Failed to fetch ShowCase:", err);
    } finally {
      setLoadingShowCases(false);
    }
  };

  useEffect(() => {
    fetchShowCases(sortType);
  }, [sortType]);

  return (
    <Container className="mb-5">
      <Typography variant="h4" gutterBottom align="center">
        Featured ShowCASE
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <ToggleButtonGroup
          value={sortType}
          exclusive
          onChange={(e, newSort) => {
            if (newSort) setSortType(newSort);
          }}
          size="small"
        >
          <ToggleButton value="recent">Recent</ToggleButton>
          <ToggleButton value="popular">Popular</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loadingShowCases ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {showCases.map((showCase) => (
            <Grid item key={showCase.id} xs={12} sm={6} md={4}>
              <ShowCASECard showCase={showCase} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FeaturedShowCase;
