import { useState, useEffect } from "react";
import "./App.css";
import baseUrl from "./baseUrl";

function App() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState("");

  // Fetch all products from the server when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseUrl}/allProducts`);
      const data = await response.json();
      console.log(data);
      setItems(data); // Set the fetched products to the state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteButtonClicked = async (productId) => {
    try {
      await fetch(`${baseUrl}/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      // After deletion, update the items state by filtering out the deleted product
      setItems(items.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleInputChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(productName);
    setShowForm(false);
  };

  const addProduct = (productName) => {
    // Send a POST request to add the product to the server
    fetch(`${baseUrl}/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: productName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems([...items, data]); // Update the items state with the newly added product
        setProductName(""); // Clear the input field
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="App">
      {items.map((item) => (
        <div key={item._id}>
          {item.name}{" "}
          <button onClick={() => deleteButtonClicked(item._id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => setShowForm(true)}>Add a product</button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter the name of Product</label>
          <input
            type="text"
            name="name"
            id="name"
            value={productName}
            onChange={handleInputChange}
            required
          />
          <input type="submit" value="Add!" />
        </form>
      ) : null}
    </div>
  );
}

export default App;
