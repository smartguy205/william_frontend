import React, { useState, useEffect, useRef } from 'react'
import { IconButton, Stack, Typography, TextField } from '@mui/material';
import DataTable from "../components/DataTable";
import { Container } from "@mui/system";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { getAllPosition, deletePosition, addPosition } from "../../apis/admin/position";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPosition() {
    const [data, setData] = useState([]);
    const testFieldRef = useRef();

    async function getPositon() {
        const data = await getAllPosition();
        setData(data?.map((item, i) => { delete item.__v; return Object.assign({ SR: i + 1 }, item) }))
    }

    useEffect(
        () => {
            (async () => {
                await getPositon();
            })()
        }, []);

    const handleDelete = async (id, _e) => {
        setData(data.filter((v) => v._id !== id));
        const res = await deletePosition(id);
        console.log(id)


        if (res.success) {
            toast.success(res.msg, {
                position: 'top-center'
            })
        } else {
            toast.error(res.msg, {
                position: 'top-center'
            })
        }
    }
    const handleAddPosition = async () => {
        if (testFieldRef.current.value === "") {
            toast.warning("Empty position", {
                position: 'top-center'
            })
            return;
        }
        const res = await addPosition({ position: testFieldRef.current.value });
        console.log(res)

        if (res.success) {
            toast.success(res.msg, {
                position: 'top-center'
            })
        } else {
            toast.error(res.msg, {
                position: 'top-center'
            })
        }

        testFieldRef.current.value = "";
        await getPositon();
    }
    return (
        <Container sx={{ mb: 5 }}>
            <Typography variant="h1" component="h2">Add  Position</Typography>
            <Stack direction="row" spacing={2}>
                <TextField fullWidth label="position" id="fullWidth" inputRef={testFieldRef} />
                <IconButton color="primary" aria-label="add positon" component="label"
                    size='large'
                    onClick={handleAddPosition}
                >
                    <AddCircleRoundedIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
            </Stack>
            <Stack mt={2}>
                <DataTable header={["SR. NO.", "Positions",]}
                    data={data}
                    handleDelete={handleDelete}
                />
            </Stack>
            <ToastContainer />
        </Container>
    )
}
