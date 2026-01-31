import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { fetchAllData } from "./products/product_service";

export default function LowStockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllData();
      setProducts(data.products);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <CircularProgress />;

  const lowStock = products.filter(p => (p.availableStock ?? p.stock) <= 3);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Low Stock Items
      </Typography>

      {lowStock.length === 0 ? (
        <Typography color="text.secondary">
          No low stock products 🎉
        </Typography>
      ) : (
        lowStock.map(p => (
          <Typography key={p.id}>
            {p.name} — Only {(p.availableStock ?? p.stock)} left
          </Typography>
        ))
      )}
    </Box>
  );
}
