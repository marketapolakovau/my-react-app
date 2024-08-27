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

const MainPage = () => {
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

    console.log(products);

    return (
        <TableContainer component={Paper}>
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
                        <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Quantity
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                            Detail
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                            Update
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.data?.map((data: Products) => (
                        <TableRow
                            key={data.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell align="right">{data.name}</TableCell>

                            <TableCell align="right">{data.quantity}</TableCell>
                            <TableCell align="right">{data.price}</TableCell>
                            <TableCell>{data.category}</TableCell>
                            <TableCell>
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
                            <TableCell>
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

export default MainPage;
