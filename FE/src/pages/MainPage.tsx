import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Products, useProducts } from "../api/api";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const products = useProducts();
    const navigate = useNavigate();

    return (
        <Container sx={{ my: 4 }}>
            {products.isPending && <h1>Loading...</h1>}
            {products.isError && <pre>{JSON.stringify(products.error)}</pre>}
            <Grid2 container spacing={2}>
                {products.data?.map((data: Products) => (
                    <Grid2 key={data.id}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={data.imageUrl}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography variant="h4" component="div">
                                    {data.name}
                                </Typography>

                                <Typography
                                    sx={{ color: "text.secondary", mb: 1.5 }}
                                >
                                    {data.category}
                                </Typography>
                                <Typography variant="body2">
                                    <Typography variant="h5">
                                        {" "}
                                        {data.price}
                                    </Typography>

                                    <br />
                                    {data.description.substring(0, 50) + "..."}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    onClick={() => {
                                        void navigate(
                                            `/product/detail/${data.id}`
                                        );
                                    }}
                                    size="small"
                                >
                                    More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export default MainPage;
