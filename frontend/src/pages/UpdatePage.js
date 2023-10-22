// export default UpdatePage;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //error checking
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

  // State to store product details
  const [product, setProduct] = useState({
    name: "",
    category: "",
    supplier: "",
    description: "",
    quantity: "",
    reOrderLevel: "",
    price: "",
  });

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supplier: "",
    description: "",
    quantity: "",
    reOrderLevel: "",
    price: "",
  });

  useEffect(() => {
    // Fetch product details based on 'id' and set them in 'product' state
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        // Also set form data to initial product details
        setFormData(data);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the new input value
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
  //  validations
  // name
    if (!formData.name) {
      newErrors.name = "Name cannot be empty.";
    } else if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name =
        "Name must start with a letter and cannot contain symbols";
    } else if (formData.name.length <= 2) {
      newErrors.name = "Name must be greater than 2 letters.";
    }
// description
    if (!formData.description) {
      newErrors.description = "Description cannot be empty.";
    } else if (!/^[a-zA-Z][a-zA-Z0-9\s-_]*$/.test(formData.description)) {
      newErrors.description =
        "description must start with a letter and cannot contain symbols";
    }
// category
    if (!formData.category) {
      newErrors.category = "Category name cannot be empty.";
    } else if (!/^[a-zA-Z0-9][a-zA-Z0-9\s]*$/.test(formData.category)) {
      newErrors.category = "Category cannot contain symbols";
    }
// supplier
    if (!formData.supplier) {
      newErrors.supplier = "Supplier name cannot be empty.";
    } else if (!/^[a-zA-Z][a-zA-Z\s-_]*$/.test(formData.supplier)) {
      newErrors.supplier = "Supplier name cannot contain symbols ";
    }
// quantity
    const quantityVal = parseInt(formData.quantity);
    if (!formData.quantity) {
      newErrors.quantity = "Quantity field cannot be empty.";
    } else if (quantityVal <= 0) {
      newErrors.quantity = "Quantity must be a valid number greater than 0";
    }
// reOrderLevel
    const reOrderLevelValue = parseFloat(formData.reOrderLevel);
    if (reOrderLevelValue <= 0 || reOrderLevelValue >= parseFloat(formData.quantity)) {
      newErrors.reOrderLevel =
        "Re-Order Level must be a valid number greater than 0 and less than Quantity.";
    }
// price
    const priceVal = parseFloat(formData.price);
    if (!formData.price) {
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



    try {
      // Send a PUT request to update the product with the new data
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        // Product updated successfully, navigate home page
        navigate("/");
      } else {
        setError({ error: json.error });
        setEmptyFields(json.emptyFields);
        console.error("Failed to update product:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="update-page">
      <h3 class="mb-2 mt-0 text-3xl font-medium leading-tight text-primary">
  Update Product
</h3>
      <div className="form-container">

        <form className="format" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={emptyFields.includes("name") ||
                  (error && error.name) ? "error" : ""}
              />
              {error.name && <span className="error">{error.name}</span>}
            </div>
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Supplier:</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className={emptyFields.includes("supplier") ||
                  (error && error.supplier) ? "error" : ""}
              />
              {error.supplier && <span className="error">{error.supplier}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={emptyFields.includes("category") ||
                  (error && error.category) ? "error" : ""}
              />
              {error.category && <span className="error">{error.category}</span>}
            </div>
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={emptyFields.includes("description") ||
                  (error && error.description) ? "error" : ""}
              />
              {error.description && <span className="error">{error.description}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className={emptyFields.includes("quantity") ||
                  (error && error.quantity) ? "error" : ""}
              />
              {error.quantity && <span className="error">{error.quantity}</span>}
            </div>
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Re-Order Level:</label>
              <input
                type="number"
                name="reOrderLevel"
                value={formData.reOrderLevel}
                onChange={handleInputChange}
                className={emptyFields.includes("reOrderLevel") ||
                  (error && error.reOrderLevel) ? "error" : ""}
              />
              {error.reOrderLevel && <span className="error">{error.reOrderLevel}</span>}
            </div>
            
            <div className="form-column">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={emptyFields.includes("price") ||
                  (error && error.price) ? "error" : ""}
              />
              {error.price && <span className="error">{error.price}</span>}
            </div>
          </div>

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
