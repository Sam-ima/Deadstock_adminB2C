import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from "@mui/icons-material/Paid";

import CommonTable from "../../components/Table/common_table";

const SellerSettlementTable = ({
  settlements = [],
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  onSettle,
  onDelete,
}) => {
  const paginatedSettlements = settlements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "product", label: "Product", width: "15%" },
    { id: "sellerId", label: "Seller ID", width: "10%" },
    { id: "buyerId", label: "Buyer ID", width: "10%" },
    { id: "subtotal", label: "Subtotal", width: "10%" },
    { id: "commission", label: "Commission", width: "10%" },
    { id: "amountToSeller", label: "Seller Amount", width: "10%" },
    { id: "paymentMethod", label: "Payment", width: "10%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "createdAt", label: "Created At", width: "10%" },
    { id: "actions", label: "Actions", width: "10%" },
  ];

  const renderRow = (row, index) => (
    <TableRow key={row.id} hover>
      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
      <TableCell>
        <Typography fontWeight="medium">{row.productName || "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{row.sellerId?.slice(0, 8)}...</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{row.buyerId?.slice(0, 8)}...</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">Rs. {row.subtotal ?? 0}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">Rs. {row.commissionAmount ?? 0}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">Rs. {row.amountToSeller ?? 0}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{row.paymentMethod || "-"}</Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={row.status || "unknown"}
          size="small"
          color={row.status === "settled" ? "success" : "warning"}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Tooltip title="Settle Payment">
          <span>
            <IconButton
              size="small"
              color="success"
              disabled={row.status === "settled"}
              onClick={() => onSettle(row.id)}
            >
              <PaidIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Delete Settlement">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return (
    <CommonTable
      columns={columns}
      data={paginatedSettlements}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage="No settlements found."
      renderRow={(row, index) => renderRow(row, index)}
    />
  );
};

export default SellerSettlementTable;
