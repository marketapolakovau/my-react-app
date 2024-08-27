import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useProductDetail, useUpdateProduct } from "../api/api";

type Detail = {
    handleClose: () => void;
    open: boolean;
    productId: number;
};
export default function UpdateProductDialog({
    handleClose,
    open,
    productId,
}: Detail) {
    const productDetail = useProductDetail(productId);
    const updateProductMutation = useUpdateProduct();

    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        category: "",
        quantity: 0,
        price: 0,
        description: "",
    });

    useEffect(() => {
        if (productDetail.data) {
            setFormData({
                id: productDetail.data.id,
                name: productDetail.data.name,
                category: productDetail.data.category,
                quantity: productDetail.data.quantity,
                price: productDetail.data.price,
                description: productDetail.data.description,
            });
        }
    }, [productDetail.data]);
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({
            ...prev,
            category: e.target.value as string,
        }));
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData) {
            updateProductMutation.mutate(formData, {
                onSuccess: handleClose,
            });
        }
    };

    if (productDetail.isLoading) return <h1>Loading...</h1>;
    if (productDetail.isError) {
        return <pre>{JSON.stringify(productDetail.error)}</pre>;
    }

    if (updateProductMutation.isError) {
        return <pre>{JSON.stringify(updateProductMutation.error)}</pre>;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {updateProductMutation.isPending && <h1>Loading...</h1>}

            <DialogTitle id="alert-dialog-title">
                {"Update university informations"}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            name="name"
                            value={formData?.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Quantity"
                            variant="standard"
                            name="quantity"
                            value={formData?.quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="Price"
                            variant="standard"
                            name="price"
                            value={formData?.price}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="category"
                                value={formData?.category}
                                label="Category"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={"Electronics"}>
                                    Electronics
                                </MenuItem>
                                <MenuItem value={"Furniture"}>
                                    Furniture
                                </MenuItem>
                                <MenuItem value={"Stationery"}>
                                    Stationery
                                </MenuItem>
                                <MenuItem value={"Kitchenware"}>
                                    Kitchenware
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            name="name"
                            value={formData?.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Update</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
