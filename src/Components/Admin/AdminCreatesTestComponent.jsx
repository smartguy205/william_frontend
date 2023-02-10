import { Container } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { addJobs, getAllJobs, deleteJob } from "../../apis/admin/jobs";
import { getAllPosition } from "../../apis/admin/position";
import { countryData } from "../CountryData";

import Multiselect from "multiselect-react-dropdown"
import { FormLabel, TextField, Checkbox, FormGroup, Grid, FormControlLabel, MenuItem, FormControl, InputLabel, Select, Stack, Button, Typography, } from '@mui/material';
import DataTable from "../components/DataTable";

// import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const testType = {
    "MCQ's": 1,
    "Typing Test": 2,
    "MCQ's + Typing Test": 3,
    "Typing Test + MCQ's": 4,
}

export const testTypeValue = {
    1: "MCQ's",
    2: "Typing Test",
    3: "MCQ's + Typing Test",
    4: "Typing Test + MCQ's",
}

const AdminCreatesTest = () => {
    const testTypeNew = [{ type: "MCQ's", checked: false }, { type: "Typing Test", checked: false }];

    const [data, setData] = useState([]); //position in table
    const [positionOptions, setPositionOptions] = useState();
    const [type, setType] = useState(testTypeNew); //check boxes
    const [newType, setNewType] = useState(null);

    const positionRef = useRef();
    const multiselectRef = useRef();

    useEffect(
        () => {
            (async () => {
                const data = await getAllJobs();
                setData(data.map(item => { delete item.__v; return { ...item } }))
                const position = await getAllPosition();
                setPositionOptions(position);
                // console.log(position)
            })()
        }, []);
    const handleDelete = async (id, _e) => {
        setData(data.filter((v) => v._id !== id));
        const res = await deleteJob(id);

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

    // const countryRef = useRef();
    //const [selectedCountries, setSelectedCountries] = React.useState([]);

    async function submit() {

        if (positionRef.current.value == "" || positionRef.current.value === undefined) {
            toast.warning("Please select position", {
                position: 'top-center'
            })
            return;
        }
        if (multiselectRef.current.state.selectedValues.length == 0) {
            toast.warning("Please select country", {
                position: 'top-center'
            })
            return;
        }
        if (newType == null) {
            toast.warning("Please select type of test", {
                position: 'top-center'
            })
            return;
        }


        const data = await addJobs({
            Countries: multiselectRef.current.state.selectedValues,
            positionOptions: positionRef.current.value, testType: testType[newType]
        })

        if (data.success) {
            data.msg.map(d => {
                if (d.exits)
                    return toast.error(d.msg, {
                        position: 'top-center'
                    })
                return toast.success(d.msg, {
                    position: 'top-center'
                })
            })
        } else {
            toast.error(data.msg, {
                position: 'top-center'
            })
        }

        const data1 = await getAllJobs();
        setData(data1.map(item => { delete item.__v; return { ...item } }))


        /**Reset Value */
        setNewType(null)
        setType(testTypeNew)
        //positionRef.current.value = ""
        multiselectRef.current.resetSelectedValues();

    }

    const handlePositionChange = (position) => {
        positionRef.current.value = (position)
    }
    const handleChangeTestType = (e, i) => {
        let data1 = [...type];
        setNewType(t => t === null ? e.target.name :
            e.target.checked ? `${t} + ${e.target.name}` :
                i === 0 ? data1[1].type : data1[0].type
        )
        data1[i].checked = e.target.checked
        setType(data1)
        if (!data1[0].checked && !data1[1].checked) setNewType(null);

    }
    const [options] = useState(countryData);
    return (
        <>
            <Container sx={{ width: '100%', mt: 10 }}>
                <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 'larger', fontWeight: '700' }}>Admin Creates Test</Typography>
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 3 }}>
                            <InputLabel id="demo-simple-select-label">Position</InputLabel>
                            <Select labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Position"
                                sx={{ width: '10rem' }}
                                inputRef={positionRef}
                                defaultValue={positionRef?.current?.value ?? ""}
                                onChange={(e) => handlePositionChange(e.target.value)}
                            >
                                {positionOptions?.map(position =>
                                    <MenuItem key={position.id} value={position.position}>
                                        {position.position}</MenuItem>)
                                    ?? <MenuItem key={"ak"}>NO Position available</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Countries</FormLabel>
                            <Multiselect options={options}
                                // onSelect={(country) => countryRef.current.value = (country)}
                                // onRemove={(country) => countryRef.current.value = (country)}
                                // onSelect={(country) => setSelectedCountries(country)}
                                // onRemove={(country) => setSelectedCountries(country)}
                                ref={multiselectRef}
                                displayValue='Country' />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ m: 3 }}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ fontWeight: '700', fontSize: 'larger' }}>Test Type</FormLabel>
                            <FormGroup>
                                {type.map((key, i) => <FormControlLabel value={key.type} key={key.type}
                                    control={
                                        <Checkbox checked={key.checked} name={key.type}
                                            onChange={(e) => handleChangeTestType(e, i)} />
                                    }
                                    label={key.type}
                                />)}
                            </FormGroup>
                            <TextField id="standard-basic" label={newType} variant="standard" disabled />
                        </FormControl>
                    </Grid>
                </Grid>
                <Stack>
                    <Stack sx={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Button variant="outlined" onClick={submit}>Submit</Button>
                    </Stack>
                </Stack>
            </Container>
            <br />
            <Container sx={{ mb: 5 }}>
                <DataTable header={["Country", "Position", "Test-Type"]}
                    data={data.map(item => {
                        return { ...item, test_type: testTypeValue[item.test_type] }
                    })}
                    handleDelete={handleDelete}
                />
            </Container>
            <ToastContainer />
        </>
    )


}

export default AdminCreatesTest;

/**
<TableContainer>
<Table aria-label="simple table">
    <TableHead>
        <TableRow>
            <TableCell sx={{ fontWeight: '700' }}>Country</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700' }}>Position</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700' }}>Test-Type</TableCell>
            <TableCell align="center" sx={{ fontWeight: '700' }}>Delete</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {data?.map((item) => (
            <TableRow key={item?._id}>
                <TableCell>{item?.country}</TableCell>
                <TableCell align="center">{item?.position}</TableCell>
                <TableCell align="center">{testType?.[item.test_type]}</TableCell>
                <TableCell align="center"><DeleteIcon sx={{ color: 'red', cursor: 'pointer' }} onClick={e => handleDelete(item?._id, e)} /></TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
</TableContainer>
 */
