import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import ProductRow from "./productRow";

const ProductsTable = ({
  products,
  expandedProduct,
  handleExpand,
  formatDate,
  expandedDescription,
  toggleDescription,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              index={index}
              expandedProduct={expandedProduct}
              handleExpand={handleExpand}
              formatDate={formatDate}
              expandedDescription={expandedDescription}
              toggleDescription={toggleDescription}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
