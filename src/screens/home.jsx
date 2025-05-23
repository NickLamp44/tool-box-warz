import HeroCarousel from "../components/blog/heroSlider";
import BlogCard from "../components/blog/blogCard";
import ShowCASECard from "../components/blog/showCaseCard";

// Material UI
import { Container, Grid, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      {/* Hero Carousel Section */}
      <Box className="mb-5">
        <HeroCarousel />
      </Box>

      {/* Showcase Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Featured Projects
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowCASECard />
          </Grid>
        </Grid>
      </Container>

      {/* Blog Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Latest Blog Posts
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <BlogCard />
          </Grid>
        </Grid>
      </Container>

      {/* Merch Section */}
      <Container className="mb-5">
        <Typography variant="h4" gutterBottom align="center">
          Latest Merch Releases
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
          <Grid item xs={12} sm={6} md={4}></Grid>
        </Grid>
      </Container>
    </Box>
  );
}
