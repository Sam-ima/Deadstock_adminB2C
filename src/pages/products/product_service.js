import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../components/config/firebase";

// Fetch all data
export const fetchAllData = async () => {
  try {
    // Fetch categories
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categoriesData = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch subcategories
    const subcategoriesSnapshot = await getDocs(collection(db, "subcategories"));
    const subcategoriesData = subcategoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch products
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsData = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      categories: categoriesData,
      subcategories: subcategoriesData,
      products: productsData,
    };
  } catch (error) {
    console.error("Failed to load data:", error);
    throw error;
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, productData);
    return { id: productId, ...productData };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    return productId;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fetch single product
export const fetchProductById = async (productId) => {
  try {
    const productSnapshot = await getDocs(collection(db, "products"));
    const product = productSnapshot.docs
      .find(doc => doc.id === productId);
    return product ? { id: product.id, ...product.data() } : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};