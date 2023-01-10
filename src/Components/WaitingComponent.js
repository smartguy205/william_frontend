import React from 'react'
import * as Sentry from '@sentry/react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { typingData } from "./StaticData/TypingTestData";
import { data } from "./StaticData/MCQData";
import { Stack } from '@mui/system';

const WaitingComponent = () => {

    const { state } = useLocation();
    console.log(state);

    return (
        <>
            {(state.type === 3) ?
                (
                    <Container sx={{ justifyContent: 'center', mt: { xs: 7, md: 15 }, color: "#444" }} className="instruction_wrapper">
                        <h1 className="mb-3 fw-bold">
                            {typingData[0].heading}
                        </h1>
                        {typingData.map((item, index) => (
                            <Typography key={index} sx={{ marginBottom: '10px' }} fontWeight={600}>
                                {item.paragraph}
                            </Typography>
                        ))}
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" style={{ border: 'none', backgroundColor: '#35aa57' }}><Link style={{ color: 'white', textDecoration: 'none', }} to="/typing-test">Start Test</Link></Button>
                        </Stack>
                    </Container>
                )

                :

                (
                    <Container sx={{ justifyContent: 'center', mt: { xs: 7, md: 15 }, color: "#444" }} className="instruction_wrapper">
                        <h1 className="mb-3 fw-bold">
                            {data[0].heading}
                        </h1>
                        {data.map((item, index) => (
                            <Typography key={index} sx={{ marginBottom: '10px' }} fontWeight={600}>
                                {item.paragraph}
                            </Typography>
                        ))}
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Button variant="outlined" style={{ border: 'none', backgroundColor: '#35aa57' }}><Link style={{ color: 'white', textDecoration: 'none', }} to="/test">Start Test</Link></Button>
                        </Stack>
                    </Container>
                )
            }
        </>
    )
}

export default Sentry.withProfiler(WaitingComponent);