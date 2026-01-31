import { Typography } from "@mui/material";

const DescriptionWithToggle = ({
  text,
  productId,
  expandedDescription,
  toggleDescription,
  wordLimit = 20,
}) => {
  if (!text) return "N/A";

  const words = text.split(" ");
  const isLong = words.length > wordLimit;
  const isExpanded = expandedDescription[productId];

  if (!isLong) return text;

  return (
    <>
      {isExpanded ? text : words.slice(0, wordLimit).join(" ") + "... "}
      <Typography
        component="span"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          fontWeight: 500,
          ml: 0.5,
        }}
        onClick={() => toggleDescription(productId)}
      >
        {isExpanded ? "Read less" : "Read more"}
      </Typography>
    </>
  );
};

export default DescriptionWithToggle;
