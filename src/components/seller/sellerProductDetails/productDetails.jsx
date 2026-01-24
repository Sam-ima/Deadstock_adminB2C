import { Box, Typography, Stack, Divider } from "@mui/material";
import DescriptionWithToggle from "./descriptionWithToggle";

const ProductDetails = ({
  product,
  formatDate,
  expandedDescription,
  toggleDescription,
}) => {
  return (
    <Box sx={{ p: 3, backgroundColor: "#fafafa" }}>
      <Typography variant="h6" gutterBottom>
        Product Details
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={1}>
        <Typography>
          • <b>Name:</b> {product.name}
        </Typography>
        <Typography>
          • <b>Slug:</b> {product.slug}
        </Typography>

        <Typography>
          • <b>Description:</b>{" "}
          <DescriptionWithToggle
            text={product.description}
            productId={product.id}
            expandedDescription={expandedDescription}
            toggleDescription={toggleDescription}
          />
        </Typography>

        <Typography>
          • <b>Base Price:</b> Rs. {product.basePrice}
        </Typography>
        <Typography>
          • <b>Current Price:</b> Rs. {product.currentPrice}
        </Typography>
        <Typography>
          • <b>Floor Price:</b> Rs. {product.floorPrice || "N/A"}
        </Typography>
        <Typography>
          • <b>Bulk Discount:</b> {product.bulkDiscount || 0}%
        </Typography>

        <Typography>
          • <b>Stock:</b> {product.stock}
        </Typography>
        <Typography>
          • <b>MOQ:</b> {product.moq}
        </Typography>

        <Typography>
          • <b>Sale Type:</b> {product.saleType}
        </Typography>
        <Typography>
          • <b>B2B Verification:</b>{" "}
          {product.requiresB2BVerification ? "Required" : "Not Required"}
        </Typography>

        <Typography>
          • <b>Depreciating:</b> {product.isDepreciating ? "Yes" : "No"}
        </Typography>
        <Typography>
          • <b>Depreciation Count:</b> {product.depreciationCount || 0}
        </Typography>
        <Typography>
          • <b>Last Depreciated:</b> {formatDate(product.lastDepreciatedAt)}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography fontWeight="bold">Specifications:</Typography>
        {product.specifications ? (
          Object.entries(product.specifications).map(([key, value]) => (
            <Typography key={key}>
              • <b>{key}:</b> {value}
            </Typography>
          ))
        ) : (
          <Typography>• No specifications available</Typography>
        )}

        <Divider sx={{ my: 1 }} />

        <Typography>
          • <b>Created At:</b> {formatDate(product.createdAt)}
        </Typography>
        <Typography>
          • <b>Updated At:</b> {formatDate(product.updatedAt)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
