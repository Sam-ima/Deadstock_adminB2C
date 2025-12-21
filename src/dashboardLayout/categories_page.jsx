import { categories } from "../adminStore/catogories";

export default function CategoriesPage() {
  return (
    <>
      <h2>Categories & Depreciation</h2>
      <ul>
        {categories.map(c => (
          <li key={c.id}>
            {c.name} → {c.depreciationRate}% / month
          </li>
        ))}
      </ul>
    </>
  );
}
