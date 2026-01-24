import {
  TableRow,
  TableCell,
  Typography,
  Chip,
  IconButton,
  Collapse,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import ProductDetails from "./productDetails";

const ProductRow = ({
  product,
  index,
  expandedProduct,
  handleExpand,
  formatDate,
  expandedDescription,
  toggleDescription,
}) => {
  const isExpanded = expandedProduct === product.id;

  return (
    <>
      <TableRow hover>
        <TableCell>{index + 1}</TableCell>

        <TableCell>
          <Typography fontWeight="bold">{product.name}</Typography>
          <Typography variant="caption">{product.slug}</Typography>
        </TableCell>

        <TableCell>Rs. {product.currentPrice?.toFixed(2)}</TableCell>

        <TableCell>
          {product.stock} units
          <Typography variant="caption">MOQ: {product.moq}</Typography>
        </TableCell>

        <TableCell>
          <Chip
            label={product.status}
            size="small"
            color={product.status === "active" ? "success" : "default"}
          />
        </TableCell>

        <TableCell>
          <IconButton onClick={() => handleExpand(product.id)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0 }}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <ProductDetails
              product={product}
              formatDate={formatDate}
              expandedDescription={expandedDescription}
              toggleDescription={toggleDescription}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductRow;
