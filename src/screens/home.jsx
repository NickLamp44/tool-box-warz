import { Box } from "@mui/material";
import HeroCarousel from "../components/content/featured/heroSlider";

import FeaturedShowCases from "../components/content/featured/featuredSC";
import FeaturedBlogs from "../components/content/featured/featuredBlog";
import FeaturedMerch from "../components/content/featured/featuredMerch";

export default function Home() {
  return (
    <Box>
      {/* Hero Carousel Section */}
      <Box className="mb-5">
        <HeroCarousel />
      </Box>

      <FeaturedShowCases />
      <FeaturedBlogs />
      <FeaturedMerch />
    </Box>
  );
}
