import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatDistanceToNow } from "date-fns";

const ExportToPDF = ({ data }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Define the columns and rows of the table
    const columns = [
      "ID",
      "Product Name",
      "Category",
      "Supplier",
      "Description",
      "Quantity",
      "Re-Order Level",
      "Price",
      "Created",
    ];
    const rows = data.map((product, index) => [
      product._id.slice(-5),
      product.name,
      product.category,
      product.supplier,
      product.description,
      product.quantity,
      product.reOrderLevel,
      `Rs ${product.price}`,
      formatDistanceToNow(new Date(product.createdAt), { addSuffix: true }),
    ]);

    // Set the table position and size
    const margin = 5;
    const pageWidth = doc.internal.pageSize.width - 2 * margin;
    doc.setFontSize(15);
    doc.text("Product Table", margin, 15);

    const tableStyles = {
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      columnStyles: { 0: { cellWidth: 30 } },
      tableLineWidth: 0.1, // Specify the width of the lines between cells
    };

    doc.autoTable({
      startY: 20,
      head: [columns],
      body: rows,
      ...tableStyles,
    });

    // Save the PDF with a name
    doc.save("product_List.pdf");
  };

  return (
    <div className="downloadb">
      <button
              class="text-white bg-custom-color hover:bg-custom-color focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-custom-color-dark dark:hover:bg-custom-color-darker dark:focus:ring-blue-800"
              onClick={exportToPDF}
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Download File</span>
      </button>

    </div>
  );
};

export default ExportToPDF;
