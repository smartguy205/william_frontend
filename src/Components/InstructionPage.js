import React, { useEffect, useState } from "react";
import "./InstructionPageStyles.css";
import axios from "axios";
import Logo from "../Components/Logo/Logo";
import { Stack, Typography, Box, Container, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { typeOfTest, routeTypeTest } from "../testTypeModal"
import { data } from "./StaticData/MCQData";
import { typingData } from "./StaticData/TypingTestData";
//import { testTypeValue } from "./Admin/AdminCreatesTestComponent";

const Instruction_Page = () => {
    const navigate = useNavigate();
    const [testTypeValue, setTestTypeValue] = useState(1);
    const [loading, setLoading] = useState(true);

    const getQuestions = async () => {
        const userID = localStorage.getItem("userID");
        const email = localStorage.getItem("email");

        if (!userID || !email) {
            toast.error("Cannot find the user");
            return navigate("/");
        }

        try {
            const data = {
                email,
                userID
            }

            const res = await axios.post(`${process.env.REACT_APP_SERVER}/user/StartTest`, data);

            if (res.data.success) {
                const { testId, testType } = res.data;
                if (testId) {
                    localStorage.setItem("testID", testId);
                    //                               2 || 4 
                    if (testType === typeOfTest.Typing || testType === typeOfTest.Typing_MCQs) {
                        navigate(routeTypeTest.Typing)// + "?type=" + testType);
                        return;
                    }
                    //else navigate("/test");
                    else navigate(routeTypeTest.MCQs);
                }
            }
            else {
                alert(res.data.msg);
                if (res.data?.testCompleted) {
                    return navigate("/TestCompleted")
                }
                else if (res.data?.retestExhausted) {
                    throw res.data.msg;
                }
                // else return navigate("/");
            }
        }
        catch (error) {
            console.log(error)

            toast.error(error.response.data.msg, {
                position: toast.POSITION.TOP_CENTER
            })
            setTimeout(() => {
                if (error.response.status === 403) {
                    return navigate("/retestExhasuted")
                }
            }, 6500)

        }
    }


    useEffect(() => {
        const checkIfUser = () => {
            const userID = localStorage.getItem("userID");
            const email = localStorage.getItem("email");

            if (!userID || !email) {
                navigate("/", { replace: true });
            }
            else {

                axios.post(`${process.env.REACT_APP_SERVER}/user/getTestType`, { userID })
                    .then(({ data }) => {
                        setTestTypeValue(data.data);
                        setLoading(false)
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err)
                    })
            }

        }
        checkIfUser();
    }, []);

    const width = window.screen.width;

    return (


        <>
            {
                loading ? <Container sx={{ height: '90vh', display: 'grid', placeItems: 'center' }}

                > <CircularProgress size={'30rem'} color="success" thickness={1} />
                    <Typography>Loading...</Typography>
                </Container> :
                    (testTypeValue === 2 || testTypeValue === 4) ?
                        (
                            <div className="container">
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} padding={"1rem"} id='timer'>
                                    <Logo />

                                </Box>
                                <Container sx={{ justifyContent: 'center', mt: { xs: 7, md: 15 }, color: "#444" }} className="instruction_wrapper">
                                    <h1 className="mb-3 fw-bold">
                                        {typingData[0].heading}
                                    </h1>
                                    {typingData.map((item, index) => (
                                        <Typography key={index} sx={{ marginBottom: '10px' }} fontWeight={600}>
                                            {item.paragraph}
                                        </Typography>
                                    ))}

                                    {
                                        width >= 800 ?
                                            <Stack sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }} >
                                                <button className="btn rounded-0 px-4 fw-bold" style={{ color: 'white', backgroundColor: '#35aa57' }} onClick={getQuestions}>Start Test</button>
                                            </Stack>
                                            :
                                            <Stack sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }} >
                                                <p className="fw-bold fst-italic fs-6 badge bg-danger text-wrap m-5">Please Complete the assessment using a deskstop device.</p>
                                                <button className="btn rounded-0 px-4 fw-bold" disabled style={{ color: 'white', backgroundColor: '#35aa57' }} onClick={getQuestions}>Start Test</button>
                                            </Stack>
                                    }

                                </Container>
                                <ToastContainer />
                            </div>
                        ) : (
                            <div className="container">
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', }} padding={"1rem"} id='timer'>
                                    <Logo />
                                </Box>
                                <Container sx={{ justifyContent: 'center', mt: { xs: 7, md: 15 }, color: "#444" }} className="instruction_wrapper">
                                    <h1 className="mb-3 fw-bold">
                                        {data[0].heading}
                                    </h1>
                                    {data.map((item, index) => (
                                        <Typography key={index} sx={{ marginBottom: '10px' }} fontWeight={600}>
                                            {item.paragraph}
                                        </Typography>
                                    ))}

                                    {
                                        width >= 800 ?
                                            <Stack sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }} >
                                                <button className="btn rounded-0 px-4 fw-bold" style={{ color: 'white', backgroundColor: '#35aa57' }} onClick={getQuestions}>Start Test</button>
                                            </Stack>
                                            :
                                            <Stack sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }} >
                                                <p className="fw-bold fst-italic fs-6 badge bg-danger text-wrap m-5">Please Complete the assessment using a deskstop device.</p>
                                                <button className="btn rounded-0 px-4 fw-bold" disabled style={{ color: 'white', backgroundColor: '#35aa57' }} onClick={getQuestions}>Start Test</button>
                                            </Stack>
                                    }
                                </Container>
                                <ToastContainer />
                            </div>
                        )
            }
        </>
    );
}
export default Sentry.withProfiler(Instruction_Page);



