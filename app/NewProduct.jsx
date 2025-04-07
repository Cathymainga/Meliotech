import { useState } from 'react'
import { Alert, Button, CloseButton, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'

export function meta() {
    return [
      { title: "New Product | Meliotech" },
      { name: "description", content: "Add a new product to Meliotech Products Catalog!" },
    ];
}

/**
 * NewProduct Component
 * 
 * This component provides a form for adding a new product. It allows users to input product details 
 * such as title, description, price, and upload images via drag-and-drop or file selection. 
 * The product details are stored in local storage upon submission.
 * 
 * State:
 * - `error` (string | null): Stores error messages for form validation.
 * - `success` (string | null): Stores success messages upon successful submission.
 * - `productDetails` (object): Stores the product details including:
 *   - `title` (string): The title of the product.
 *   - `description` (string): The description of the product.
 *   - `price` (string): The price of the product.
 *   - `images` (array): An array of base64-encoded image URLs.
 * 
 * Handlers:
 * - `handleInputChange(event)`: Updates the product details state when form inputs change.
 * - `handleDrop(event)`: Handles image uploads via drag-and-drop.
 * - `handleFileSelect(event)`: Handles image uploads via file selection.
 * - `bitmapAndPreview(imageFiles)`: Converts image files to base64 URLs and updates the images state.
 * - `handleDragOver(event)`: Prevents the default drag-over behavior.
 * - `handleSubmit(event)`: Validates the form, saves the product to local storage, and resets the form.
 * 
 * Features:
 * - Drag-and-drop or click-to-upload functionality for images.
 * - Real-time preview of uploaded images with the ability to remove them.
 * - Form validation to ensure all fields are filled before submission.
 * - Displays success or error messages based on the form submission status.
 * 
 * Dependencies:
 * - React Bootstrap components: `Container`, `Row`, `Col`, `Form`, `InputGroup`, `Button`, `Alert`, `Image`, `CloseButton`.
 * 
 * @component
 */
function NewProduct() {
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    bitmapAndPreview(imageFiles);
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    bitmapAndPreview(imageFiles);
  };

  const bitmapAndPreview = (imageFiles) => {
    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result); // returns the base64 URL
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    Promise.all(imageFiles.map(readFileAsDataURL))
        .then((imageUrls) => {
            setProductDetails((prevDetails) => ({
                ...prevDetails,
                images: [...prevDetails.images, ...imageUrls],
            }));
        })
        .catch((error) => {
            console.error("Error reading files:", error);
        });
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productDetails.title || !productDetails.description || !productDetails.price || productDetails.images.length === 0) {
      setError("Please provide all product details before submitting.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    const saved = JSON.parse(localStorage.getItem("products")) || [];
    saved.push({
        id: new Date().getTime(),
        ...productDetails,
    })
    localStorage.setItem("products", JSON.stringify(saved));
    setSuccess("Product added successfully!");
    // Reset form
    setProductDetails({ title: "", description: "", price: "", images: [] });
  };

  return (
    <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col xs={2} md={3}/>
          <Col xs={6} md={6}>
              <Form onSubmit={handleSubmit} className="product-form">
                  <h5 className="mb-3">Add New Product</h5>
                  <Form.Control
                  type="text"
                  name="title"
                  placeholder="Product Title"
                  value={productDetails.title}
                  onChange={handleInputChange}
                  className="mb-3"
                  />

                  <InputGroup className="mb-3">
                  <InputGroup.Text id="product-price">BWP</InputGroup.Text>
                  <Form.Control
                      aria-label="Product Price"
                      aria-describedby="product-price"
                      type="number"
                      name="price"
                      placeholder="Product Price"
                      value={productDetails.price}
                      onChange={handleInputChange}
                  />
                  </InputGroup>
                  
                  <Form.Control 
                  as="textarea"
                  rows={3}
                  aria-label="Product Description"
                  aria-describedby="product-decription"
                  name="description"
                  placeholder="Product Description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  />
                  <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="drop-area"
                  onClick={() => document.getElementById("fileInput").click()}
                  >
                  <p>Drag and drop images here, or click to upload</p>
                  <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileSelect}
                  />
                  </div>
                  <div className="preview-container">
                  {productDetails.images.map((image, index) => (
                      <div
                      key={index}
                      className="preview-item"
                      >
                      <Image
                          src={image}
                          rounded
                          alt={`Uploaded preview ${index}`}
                          className="preview-image"
                      />
                      <CloseButton
                          onClick={() =>
                          setProductDetails((prevDetails) => ({
                              ...prevDetails,
                              images: prevDetails.images.filter((_, i) => i !== index),
                          }))
                          }
                          className="remove-button"
                          title="Remove image"
                      />
                      </div>
                  ))}
                  </div>
                  { error || success ? <Alert variant={ error ? "danger" : "success" } className="alert">
                  {error || success}
                  </Alert> : <></> }
                  <Button onClick={handleSubmit}>Submit</Button>
              </Form>
          </Col>
          <Col xs={2} md={3}/>
        </Row>
    </Container>
  );
}

export default NewProduct
