import React, { useState } from "react";
import Multiselect from 'multiselect-react-dropdown';  //install
import { Container } from "@mui/system";

const MultiSelect = () => {

    const data = [
        { Country: 'India', int: 1 },
        { Country: 'USA', id: 2 },
        { Country: 'UK', id: 3 },
        { Country: 'Russia', id: 4 },
        { Country: 'Nepal', id: 5 },
        { Country: 'Sweden', id: 6 },
        { Country: 'Africa', id: 7 },
    ];

    const positiondata = [
        { position: 'HR', id: 1 },
        { position: 'CEO', id: 2 },
        { position: 'UK', id: 3 },
        { position: 'ABG', id: 4 },
        { position: 'YTV', id: 5 },
    ];

    const [options] = useState(data);

    const [positionOptions] = useState(positiondata)

    return (
        <>
            <Container sx={{ mt: 10 }}>
                <Multiselect options={options} displayValue='Country' />

                <MultiSelect options={positionOptions} displayValue='position' />
            </Container>

        </>
    )

}

export default MultiSelect;