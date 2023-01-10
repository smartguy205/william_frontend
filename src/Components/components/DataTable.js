import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DataTable({ data, header, handleDelete }) {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {header?.map(head => <TableCell key={head} align="center" sx={{ fontWeight: '700' }}>{head}</TableCell>)}
                        <TableCell align="center" sx={{ fontWeight: '700' }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item) => (
                        <TableRow key={item?._id}>
                            {Object.keys(item).filter(i => i !== "_id").map((key, i) => <TableCell key={item._id + i} align="center">{item[key]}</TableCell>)}
                            <TableCell align="center"><DeleteIcon sx={{ color: 'red', cursor: 'pointer' }}
                                onClick={e => handleDelete(item?._id, e)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
