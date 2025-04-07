/**
 * Product component displays a product with an image, title, price, and a click handler.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.image - URL of the product image.
 * @param {string} props.title - Title of the product.
 * @param {number} props.price - Price of the product in BWP.
 * @param {Function} props.onClick - Callback function triggered when the product is clicked.
 * @returns {JSX.Element} A styled product card.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const Product = ({ image, title, price, onClick }) => {
    return (
        <div onClick={onClick} className="product" style={{ padding: '10px', textAlign: 'center' }}>
            <Image rounded src={image} alt={title} style={{ objectFit: 'cover', width: '100%' }} className="product-image" />
            <h6 className="product-title">{title}</h6>
            <p>BWP {price}</p>
        </div>
    );
};

Product.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Product;