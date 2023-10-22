import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useNavigate } from "react-router-dom";

// import { useEffect } from 'react';

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const navigate = useNavigate(); // Hook for programmatic navigation

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reOrderLevel, setReOrderLevel] = useState("");
  const [price, setPrice] = useState("");

  //for error checking
  const [error, setError] = useState({
    name: "",
    category: "",
    supplier: "",
    description: "",
    quantity: "",
    reOrderLevel: "",
    price: "",
  });

  const [emptyFields, setEmptyFields] = useState([]);

  // const [suppliersList, setSuppliersList] = useState([]);

  // useEffect(() => {
  //   // Fetch the list of suppliers from your API
  //   const fetchSuppliers = async () => {
  //     try {
  //       const response = await fetch('/api/suppliers');                      //when supplier data is added
  //       const data = await response.json();

  //       if (response.ok) {
  //         // Extract the list of supplier names
  //         const supplierNames = data.map((supplier) => supplier.name);
  //         setSuppliersList(supplierNames);
  //       } else {
  //         console.error('Failed to fetch suppliers');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching suppliers:', error);
  //     }
  //   };

  //   fetchSuppliers();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {}; // Temporary object to store errors
// validations
// name
    if (!name) {
      newErrors.name = "Name cannot be empty.";
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(name)) {
      newErrors.name =
        "Name cannot contain numbers or symbols";
    } else if (name.length <= 2) {
      newErrors.name = "Name must be greater than 2 letters.";
    }
// description
    if (!description) {
      newErrors.description = "Description cannot be empty.";
    } else if (!/^[a-zA-Z][a-zA-Z0-9\s-_]*$/.test(description)) {
      newErrors.description =
        "description must start with a letter and cannot contain symbols";
    }
// category
    if (!category) {
      newErrors.category = "Category name cannot be empty.";
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/.test(category)) {
      newErrors.category = "Category cannot contain symbols";
    }
// supplier
    if (!supplier) {
      newErrors.supplier = "Supplier name cannot be empty.";
    } else if (!/^[a-zA-Z0-9][a-zA-Z\s-_]*$/.test(supplier)) {
      newErrors.supplier = "Supplier name cannot contain symbols ";
    }
// quantity
    const quantityVal = parseInt(quantity);
    if (!quantity) {
      newErrors.quantity = "Quantity field cannot be empty.";
    } else if (quantityVal <= 0) {
      newErrors.quantity = "Quantity must be a valid number greater than 0";
    }
// reOrderLevel
    const reOrderLevelValue = parseFloat(reOrderLevel);
    if (reOrderLevelValue <= 0 || reOrderLevelValue >= parseFloat(quantity)) {
      newErrors.reOrderLevel =
        "Re-Order Level must be a valid number greater than 0 and less than Quantity.";
    }
// price
    const priceVal = parseFloat(price);
    if (!price) {
      newErrors.price = "Price field cannot be empty.";
    } else if (priceVal <= 0) {
      newErrors.price = "Price must be a valid number greater than 0";
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, update the error state and return
      setError(newErrors);
      return;
    }

    // Clear errors for valid inputs
    setError({});

    const product = {
      name,
      category,
      supplier,
      description,
      quantity,
      reOrderLevel,
      price,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError({ error: json.error });
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setCategory("");
      setSupplier("");
      setDescription("");
      setQuantity("");
      setReOrderLevel("");
      setPrice("");
      setError(null);
      setEmptyFields([]);
      console.log("new product added", json);
      dispatch({ type: "CREATE_PRODUCT", payload: json });

      // Redirect to the home page
      navigate("/");
    }
  };

  return (
    <div className="form-container">
      <form className="format" onSubmit={handleSubmit}>
      <h3 class="mb-2 mt-0 text-3xl font-medium leading-tight text-primary">
  Add New Product
</h3>

        <div className="form-row">
          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Product Name:
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of product"
              value={name}
              className={
                emptyFields.includes("name") || (error && error.name)
                  ? "error"
                  : ""
              }
            />
            {error.name && <span className="error">{error.name}</span>}
          </div>
          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Supplier:
            </label>
            <input
              type="text"
              onChange={(e) => setSupplier(e.target.value)}
              placeholder="Stone Creations"
              value={supplier}
              className={
                emptyFields.includes("supplier") || (error && error.supplier)
                  ? "error"
                  : ""
              }
            />
            {error.supplier && <span className="error">{error.supplier}</span>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Category:
            </label>
            <input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Kitchen"
              value={category}
              className={
                emptyFields.includes("category") || (error && error.category)
                  ? "error"
                  : ""
              }
            />
            {error.category && (
              <span className="error">{error.category}</span>
            )}
          </div>
          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Description:
            </label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A beautifull desciption of the product for the customers to see"
              value={description}
              className={
                emptyFields.includes("description") ||
                  (error && error.description)
                  ? "error"
                  : ""
              }
            />
            {error.description && (
              <span className="error">{error.description}</span>
            )}
          </div>
        </div>


        <div className="form-row">
          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Quantity:
            </label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="XXX"
              value={quantity}
              className={
                emptyFields.includes("quantity") || (error && error.quantity)
                  ? "error"
                  : ""
              }
            />
            {error.quantity && <span className="error">{error.quantity}</span>}
          </div>

          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Re-Order Level:
            </label>
            <input
              type="number"
              onChange={(e) => setReOrderLevel(e.target.value)}
              value={reOrderLevel}
              placeholder="At what quantity level should we reorder?"
              className={
                emptyFields.includes("reOrderLevel") ||
                  (error && error.reOrderLevel)
                  ? "error"
                  : ""
              }
            />
            {error.reOrderLevel && (
              <span className="error">{error.reOrderLevel}</span>
            )}
          </div>

          <div className="form-column">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Price:
            </label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Rs "
              className={
                emptyFields.includes("price") || (error && error.price)
                  ? "error"
                  : ""
              }
            />
            {error.price && <span className="error">{error.price}</span>}
          </div>
        </div>

        <button>Add Product</button>
      </form>

    </div>
  );
};

export default ProductForm;
