import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProductDetail } from "../../api/api";
import "./detail.css";

const Detail = () => {
    const { productId } = useParams();
    const productDetail = productId && useProductDetail(+productId);
    console.log(productDetail);

    const [quantity, setQuantity] = useState(1);

    if (!productDetail) return <h1>Not found</h1>;
    const handleIncrease = () => {
        if (quantity < productDetail.data.quantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    if (productDetail.isLoading) return <h1>Loading...</h1>;
    if (productDetail.isError) {
        return <pre>{JSON.stringify(productDetail.error)}</pre>;
    }
    return (
        <div>
            <div className="product-container ">
                <div className="product-detail-container">
                    <div>
                        <img
                            className="main-image"
                            src={productDetail.data.imageUrl}
                        />
                    </div>
                    <div className="additional-images-container">
                        {productDetail.data.additionalImages.map(
                            (image: any) => (
                                <img className="additional-image" src={image} />
                            )
                        )}
                    </div>
                </div>
                <div className="product-info">
                    <h1 className="product-title">{productDetail.data.name}</h1>
                    <p className="product-description">
                        {productDetail.data.description}
                    </p>
                    <div className="quantity-control">
                        {quantity != 1 ? (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handleDecrease}
                            >
                                -
                            </Button>
                        ) : (
                            <Button disabled></Button>
                        )}
                        <input type="text" value={quantity} readOnly />
                        {productDetail.data.quantity !== quantity && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={handleIncrease}
                            >
                                +
                            </Button>
                        )}
                    </div>
                    <p className="product-price">
                        ${productDetail.data.price.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
