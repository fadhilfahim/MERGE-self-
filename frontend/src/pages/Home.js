import { useProductsContext } from "../hooks/useProductsContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import ProductDetails from "../components/ProductDetails";
import ExportToPDF from "../components/ExportToPdf";

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const [suppliers, setSuppliers] = useState([]); // State to store unique suppliers

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
        setFilteredProducts(json); // initiallize the filterProduct with the products
        const uniqueSuppliers = [
          ...new Set(json.map((product) => product.supplier)),
        ]; //array tp store the unique suppliers
        setSuppliers(uniqueSuppliers);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    if (products === null) {
      // If products is null
      return;
    }
    // Filter products based on the search term when it changes
    const filtered = products.filter((product) => {
      const matchesSearch = Object.values(product).some((field) => {
        if (typeof field === "string") {
          return field.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      const matchesSupplier =
        selectedSupplier === "" || product.supplier === selectedSupplier;

      return matchesSearch && matchesSupplier;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedSupplier, products]);

  return (
    <div className="home">
      <div className="top-bar">
        <div>
          <Link to="/NewProduct">
            <button
              type="button"
              class="text-white bg-custom-color hover:bg-custom-color focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-custom-color-dark dark:hover:bg-custom-color-darker dark:focus:ring-blue-800"
            >
              <svg
                className="w-3.5 h-3.5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 00-2 0v6H3a1 1 0 000 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3z" />
              </svg>
              ADD new Product
            </button>
          </Link>
          <ExportToPDF data={filteredProducts} />
        </div>

        <div className="search-bar">
          <span className="search-icon">search</span>
          <input
            type="text"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-bar">
          <span>Filter by Supplier:</span>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="">All Suppliers</option>
            {suppliers.map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Re-OrderLevel</th>
            <th>Price</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts &&
            filteredProducts.map((product) => (
              <ProductDetails key={product._id} product={product} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
