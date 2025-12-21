import { products } from "../adminStore/products";

export default function LowStockPage() {
  const lowStock = products.filter(p => p.stock <= 3);

  return (
    <>
      <h2>Low Stock Items</h2>
      {lowStock.map(p => (
        <p key={p.id}>
          {p.name} — Only {p.stock} left
        </p>
      ))}
    </>
  );
}
