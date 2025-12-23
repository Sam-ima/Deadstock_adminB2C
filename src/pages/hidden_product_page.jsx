import { products } from "../adminStore/products";

export default function HiddenProductsPage() {
  const hidden = products.filter(p => p.status === "HIDDEN");

  return (
    <>
      <h2>Hidden Products</h2>
      {hidden.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}
    </>
  );
}
