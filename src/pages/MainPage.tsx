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
import { Universities, useUniversities } from "../api/api";
import Detail from "./Detail";
const MainPage = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const universitiesQuery = useUniversities();

    if (universitiesQuery.isLoading) return <h1>Loading...</h1>;
    if (universitiesQuery.isError) {
        return <pre>{JSON.stringify(universitiesQuery.error)}</pre>;
    }

    return (
        <TableContainer component={Paper}>
            {open && <Detail handleClose={handleClose} open={open} />}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                            Country
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">
                            Code
                        </TableCell>
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {universitiesQuery.data?.map((data: Universities) => (
                        <TableRow
                            key={data.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{data.country}</TableCell>
                            <TableCell align="right">{data.name}</TableCell>
                            <TableCell align="right">
                                {data.alpha_two_code}
                            </TableCell>
                            <TableCell onClick={handleClickOpen}>
                                <Button>Open</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MainPage;
