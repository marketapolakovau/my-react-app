import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                    }}
                >
                    <Button
                        sx={{ my: 2, mr: 2, color: "white", display: "block" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        sx={{
                            my: 2,
                            color: "#f6f5f5",
                            display: "block",
                        }}
                        onClick={() => {
                            navigate("/administration");
                        }}
                    >
                        Administration
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        sx={{ my: 2, color: "#f6f5f5", display: "block" }}
                        href="https://github.com/marketapolakovau/my-next-app"
                        target="_blank" // Opens in a new tab
                    >
                        Next.js app
                    </Button>
                </Box>
            </Container>
        </AppBar>
    );
}
export default Header;
