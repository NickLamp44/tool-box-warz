import { Box, Typography, Card, CardContent } from "@mui/material";

const ArticleViewer = ({ article }) => {
  if (!article) return null;

  const { sections } = article;

  const section = sections?.[0] || {};
  const videoUrl = section.url || "";
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];

  return (
    <Card sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <CardContent>
        {videoId && (
          <Box sx={{ position: "relative", paddingTop: "56.25%", mb: 2 }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={section.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        )}

        <Typography variant="body1">{section.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ArticleViewer;
