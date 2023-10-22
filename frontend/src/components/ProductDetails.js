import { Link } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

  const handleClickDelete = async () => {
    const response = await fetch("/api/products/" + product._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
    }
  };

  const getShortId = (longId) => {
    return longId.slice(-5);
  };

  const shortId = getShortId(product._id);

  return (
    <tr key={product._id}>
      <td title={product._id}>{shortId}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.supplier}</td>
      <td>{product.description}</td>
      <td>{product.quantity}</td>
      <td>{product.reOrderLevel}</td>
      <td>Rs {product.price}</td>
      <td>
        {formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}
      </td>
      <td>
        {/* buttons */}
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => handleClickDelete(product)}
            type="button"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-500 dark:focus:text-white"
            title="Click to delete product"          
          >
            <svg
              class="w-[19px] h-[19px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.1"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
              />
            </svg>
            {/* delete */}
          </button>

          <Link to={`/UpdatePage/${product._id}`}>
            <button
              type="button"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-500 dark:focus:text-white"
              title="Click to Edit product" 
            >
              <svg
                class="w-[19px] h-[19px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.1"
                  d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"
                />
              </svg>
              {/* update */}
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
