import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import { Products, useProducts } from "../api/api";
import UpdateProductDialog from "./UpdateProductDialog";
import { useNavigate } from "react-router-dom";

const Administration = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState<any>(null);

    const handleClickOpen = (product: number) => {
        setOpen(true);
        setProductId(product);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const products = useProducts();

    return (
        <TableContainer sx={{ my: 5 }} component={Paper}>
            {products.isPending && <h1>Loading...</h1>}
            {products.isError && <pre>{JSON.stringify(products.error)}</pre>}
            {products.isFetching && <h1>Updating...</h1>}

            {open && (
                <UpdateProductDialog
                    handleClose={handleClose}
                    open={open}
                    productId={productId}
                />
            )}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Name
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Quantity
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Price
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Category
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Detail
                        </TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Update
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.data?.map((data: Products) => (
                        <TableRow key={data.id}>
                            <TableCell align="center">{data.name}</TableCell>

                            <TableCell align="center">
                                {data.quantity}
                            </TableCell>
                            <TableCell align="center">{data.price}</TableCell>
                            <TableCell align="center">
                                {data.category}
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => {
                                        void navigate(
                                            `/product/detail/${data.id}`
                                        );
                                    }}
                                >
                                    Detail
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    onClick={() => handleClickOpen(data.id)}
                                >
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Administration;
