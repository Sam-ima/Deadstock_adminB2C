import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const paginatedData = settlements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Open eSewa only if payment method is ESEWA and not settled
  const handleEsewaPay = (row) => {
    if (row.paymentMethod !== "ESEWA" || row.status === "settled") return;

    const esewaUrl = "https://uat.esewa.com.np/epay/main";

    const params = new URLSearchParams({
      amt: row.amountToSeller,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: row.amountToSeller,
      pid: row.id,
      scd: "EPAYTEST",
      su: window.location.origin + "/payment-success",
      fu: window.location.origin + "/payment-failure",
    });

    window.open(`${esewaUrl}?${params.toString()}`, "_blank");
  };

  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "product", label: "Product", width: "15%" },
    { id: "seller", label: "Seller", width: "20%" },
    { id: "subtotal", label: "Subtotal", width: "10%" },
    { id: "commission", label: "Commission", width: "10%" },
    { id: "amount", label: "Seller Amount", width: "10%" },
    { id: "payment", label: "Payment", width: "10%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "created", label: "Created", width: "10%" },
    { id: "actions", label: "Actions", width: "10%" },
  ];

  const renderRow = (row, index) => (
    <TableRow key={row.id} hover>
      <TableCell>{page * rowsPerPage + index + 1}</TableCell>

      <TableCell>
        <Typography fontWeight={500}>{row.productName}</Typography>
      </TableCell>

      <TableCell>
        <Typography fontWeight={500}>{row.sellerName}</Typography>
        <Typography variant="caption" color="text.secondary">
          {row.sellerPhone}
        </Typography>
      </TableCell>

      <TableCell>Rs. {row.subtotal}</TableCell>
      <TableCell>Rs. {row.commissionAmount}</TableCell>
      <TableCell>Rs. {row.amountToSeller}</TableCell>

      <TableCell>
        <Chip label={row.paymentMethod} size="small" color="secondary" />
      </TableCell>

      <TableCell>
        <Chip
          label={row.status}
          size="small"
          color={row.status === "settled" ? "success" : "warning"}
        />
      </TableCell>

      <TableCell>
        {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}
      </TableCell>

      <TableCell>
        {/* Pay with eSewa */}
        <Tooltip title="Pay via eSewa">
          <span>
            <IconButton
              size="small"
              color="success"
              disabled={row.status === "settled"}
              onClick={() => handleEsewaPay(row)}
            >
              <PaidIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>

        {/* Mark as Settled with confirmation */}
        <Tooltip title="Mark as Settled">
          <span>
            <IconButton
              size="small"
              color="primary"
              disabled={row.status === "settled"}
              onClick={() => {
                const confirmSettle = window.confirm(
                  `Are you sure you want to settle payment for ${row.sellerName}?`
                );
                if (confirmSettle) {
                  onSettle(row.id, row.status);
                }
              }}
            >
              ✔
            </IconButton>
          </span>
        </Tooltip>

        {/* Delete */}
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
      data={paginatedData}
      page={page}
      rowsPerPage={rowsPerPage}
      count={settlements.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage="No settlements found."
      renderRow={renderRow}
    />
  );
};

export default SellerSettlementTable;