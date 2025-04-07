import './App.css'
import { Button, Carousel, Col, Container, Image, Modal, Row } from 'react-bootstrap'
import Product from './components/Product';
import { useEffect, useState } from 'react';

export function meta() {
    return [
      { title: "Products | Meliotech" },
      { name: "description", content: "Welcome to Meliotech Products Catalog!" },
    ];
}

/**
 * The `Products` component displays a list of products and allows users to view product details in a modal.
 * 
 * Features:
 * - Fetches and displays products from local storage.
 * - Displays a modal with product details, including a carousel of images, when a product is selected.
 * - Handles product selection and modal visibility.
 * 
 * State:
 * - `products` (Array): List of products fetched from local storage.
 * - `product` (Object|null): The currently selected product, or `null` if no product is selected.
 * 
 * Effects:
 * - Fetches products from local storage on component mount and initializes the `products` state.
 * 
 * Props:
 * - None
 * 
 * Dependencies:
 * - React Bootstrap components: `Container`, `Modal`, `Carousel`, `Image`, `Row`, `Col`, `Button`.
 * - Custom `Product` component for rendering individual product cards.
 * 
 * Example usage:
 * ```jsx
 * <Products />
 * ```
 */
function Products() {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState();

    const handleClose = () => setProduct(null);

    const onProductSelect = (selected) => {
        setProduct(selected);
    }

    useEffect(() => {
      (()=>{
        setProducts(JSON.parse(localStorage.getItem("products")) || [])
      })()
    }, [])
    
  return (
    <Container>
        <Modal backdrop="static" keyboard={false} show={product} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product?.title} (BWP {product?.price})</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Carousel>
              { product?.images.map((image, i) => (
                <Carousel.Item key={i}>
                  <Image src={image} style={{ width: "100%" }} rounded alt={`Image ${i+1}`} />
                  <Carousel.Caption style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <h6>Image {i+1}</h6>
                    <p>{product?.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )) }
            </Carousel>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        { products.length == 0 ?
            <h3>No products to display</h3>
            : <Row>{products.map((product) => (<Col key={product.id} md="4" xs="6"><Product onClick={()=>{onProductSelect(product)}} image={product.images[0]} title={product.title} price={product.price} /></Col>))}</Row>
        }    
    </Container>
  );
}

export default Products