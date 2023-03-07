import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Link, useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import CircularProgress from '@mui/material/CircularProgress';
function App() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileData, setSelectedFileData] = useState(null);
    const [mount, setMount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFullText, setShowFullText] = useState(false);
    const [positions, setPositons] = useState([]);

    const [data, setData] = useState({
        fullName: "",
        email: "",
        phone: "",
        position: "Virtual Assistant",
        language: "English",
        experience: "1",
    });

    const getPositions = async () => {

        try {
            const positionRes = await axios.post(`${process.env.REACT_APP_SERVER}/user/getposition`)
            if (positionRes?.data.success) {
                let { data } = positionRes.data;
                data = data.map(d => d.position)
                //console.log(data)
                setPositons(data);
                setData((prev) => {
                    return {
                        ...prev,
                        position: data[0],
                    };
                })
            }
            else
                setPositons([])

        } catch (error) {
            // setPositons(data)

            console.log(error);
            toast.error(error.response.data.msg, {
                position: 'top-center', style: { width: '28rem' }
            });
        }
    }

    // using only to get Positions
    useEffect(() => {
        if (mount) {
            getPositions();
        }
        else {
            setMount(true)
        }
    }, [mount]);

    function handleReadMoreClick() {
        setShowFullText(true);
    }

    // file
    const changeHandler = async (event) => {


        const fileSize = parseInt(event.target.files?.[0].size / 1000000);
        if (fileSize > 25) {
            toast.warning("Please upload a file smaller than 25 MB", {
                position: 'top-center', style: { width: '28rem' }
            });
            return;
        }
        try {
            const formData = new FormData();
            formData.append("body", event.target.files[0])

            setSelectedFile(event.target.files[0]);
            setSelectedFileData(event.target.files[0])

        }
        catch (error) {
            console.log(error);
        }
    };

    // save the user data to database
    const SaveDataToDataBase = async (isFile, fileLink = "") => {
        try {
            let allData = { ...data }

            if (isFile.file) {
                console.log('data set');
                allData = { ...allData, file: fileLink }
            }

            let UserDataRes = await axios.post(`${process.env.REACT_APP_SERVER}/user/userCV`, { data: allData });
            if (UserDataRes.data.success) {
                console.log('data success ');
                const { userID, email } = UserDataRes.data.user;
                localStorage.setItem("userID", userID);
                localStorage.setItem("email", email);
                navigate(`/startTest`, { replace: true })
            }
            else {
                toast.error(UserDataRes.data.error, {
                    position: 'top-center', style: { width: '28rem' }
                });
            }
            setLoading(false);
        }
        catch (error) {
            toast.error(error.response.data.error, {
                position: 'top-center', style: { width: '28rem' }
            });
            setLoading(false);
        }
    }


    // form details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            await axios.get(`${process.env.REACT_APP_SERVER}/admin/jobs/${data?.position}`);

            if (selectedFile?.name) {
                let fileName = selectedFile.name.trim().replace(/\s/g, "_")
                if (!fileName || !selectedFileData) {
                    return false;
                }

                if (selectedFile && selectedFileData) {

                    // creates a preSigned url
                    await axios.post(`${process.env.REACT_APP_SERVER}/user/url`, { fileName, data: data })
                        .then((res) => {
                            if (res.data.success) {
                                axios.put(res.data.url, {
                                    body: selectedFileData,
                                }, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        //'Content-Encoding': 'base64'
                                    }
                                }).then((result) => {
                                    console.log(result)
                                    if (result?.status) {
                                        SaveDataToDataBase({ file: true }, res.data.file);
                                    }
                                }).catch(error => {

                                    toast.error("File upload failed", {
                                        position: 'top-center', style: { width: '28rem' }
                                    })
                                    setLoading(false);
                                });
                            }

                        }
                        ).catch((error) => {
                            console.log(error)
                            toast.error("Unexpected error occurred, Failed to upload file!", {
                                position: 'top-center', style: { width: '28rem' }
                            });
                            setLoading(false);
                        })
                }
            }
            else {
                SaveDataToDataBase({ file: false })
            }
        }
        catch (err) {
            console.log(err)
            toast.error(err.response.data.error, {
                position: 'top-center', style: { width: '28rem' }
            });
            setLoading(false);
        }
    }


    return (
        <div className="App  container-fluid">
            <h2>Be Positive IT</h2>
            <div className="box row col-sm-12 col-md-8 col-lg-6">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                    <p className="info text-center fs-5">
                        Please verify or enter your personal information
                    </p>
                    <label className="fw-normal">Full Name:</label>
                    <br />
                    <input
                        type="text"
                        className="text"
                        name="fullName"
                        placeholder="Please Enter your full name"
                        value={data.fullName}
                        required
                        onChange={handleChange}
                    />
                    <br />
                    <label className="fw-normal">Email:</label>
                    <br />
                    <input
                        type="email"
                        className="text"
                        name="email"
                        placeholder="Please Enter your Email"
                        value={data.email}
                        required
                        onChange={handleChange}
                    />
                    <br />
                    <label className="fw-normal">Phone Number:</label>
                    <br />
                    <input
                        type="number"
                        className="text"
                        name="phone"
                        placeholder="Please Enter your phone number"
                        value={data.phone}
                        required
                        onChange={handleChange}
                    />
                    <br />
                    <label className="fw-normal">Choose Your Position: *</label>
                    <br />
                    <select
                        value={data?.position}
                        name="position"
                        className="text"
                        required
                        onChange={handleChange}
                    >
                        {positions.length > 0 ? positions?.map((p, index) => <option key={index} value={p}>{p}</option>) :
                            <option key={'no-position'} disabled>NO position </option>
                        }
                    </select>
                    <br />
                    <label className="fw-normal">Select Language: *</label>
                    <br />
                    <select
                        value={data.language}
                        name="language"
                        className="text"
                        required
                        onChange={handleChange}
                    >
                        <option value="English">English</option>
                    </select>
                    <br />
                    <label className="fw-normal">Your Work Experience: *</label>
                    <br />
                    <select
                        value={data.experience}
                        name="experience"
                        className="text"
                        required
                        onChange={handleChange}
                    >
                        <option value="1">0-1 year</option>
                        <option value="2">1-3 years</option>
                        <option value="3">3-5 years</option>
                        <option value="4">5+ years</option>
                    </select>
                    <br />

                    <div className="row d-flex justify-content-center mt-3">
                        <label htmlFor="fileIp" className="fileIp w-auto text-center mb-2 border p-2 rounded">Upload CV</label>
                        {
                            selectedFile?.name &&
                            <p className="fs-6 text-center">File: {selectedFile?.name}</p>
                        }
                        <input
                            id="fileIp"
                            type="file"
                            accept=".pdf,.txt"
                            name="file"
                            style={{ display: "none" }}
                            onChange={changeHandler}

                        />

                    </div>
                    {loading && selectedFile ?
                        (
                            <>
                                <div className="d-flex justify-content-center">
                                    <CircularProgress color="success" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <p>Please Wait.. your file is being uploaded</p>
                                </div>
                            </>
                        ) :
                        (
                            <input className="submit" type="submit" value="Submit" />
                        )
                    }
                </form>
                <div>
                    {showFullText ? (
                        <p>DATA CONTROLLER
                            The controller of your personal data is BE POSITIVE IT sp. z o.o. seated in Poznań at Młyńska 16, 8th floor, 61-730 Poznań,
                            entered into the National Court Register of Entrepreneurs (KRS) under number 0001008984. HOW TO CONTACT US We have not
                            appointed a data protection officer. In all cases related to personal data processing and exercising rights in connection with data
                            processing, you can write to ul. Młyńska 16, 8 piętro, 61-730 Poznań, or send an email to luke@marketingmgmt.net. WHY WE
                            PROCESS YOUR PERSONAL DATA We process personal data you reveal to us (e.g. in your CV) for the purpose of the recruitment
                            process on a basis of Article 6(1) letter b of the GDPR*. Personal data collected during the interview or qualification tests are
                            processed on a basis of our legitimate interest - that is to verify your skills and abilities - on a basis of Article 6(1) letter f of the
                            GDPR. We process your personal data for the purpose of future recruitment processes or to verify information about your work
                            experience and references from previous employers only if you give us your voluntary consent to do so - on a basis of Article 6(1)
                            letter a of the GDPR. We can also process your personal data to determine and pursue possible claims or defend against such
                            claims – which is our legitimate interest, on a basis of Article 6(1) letter f of the GDPR. WHO WILL HAVE ACCESS TO YOUR
                            PERSONAL DATA We can provide your personal data to authorized entities under the provisions of law, recruitment platforms and
                            to the entities providing services i.a. in the field of IT, human resources, audit, legal support, enforcement and accountancy that
                            process personal data only on a basis of agreements and in accordance with our instructions. HOW LONG WE KEEP YOUR
                            PERSONAL DATA Your personal data will be processed for the time of the recruitment process. After the recruitment, your personal
                            data will be processed for the purpose of carrying out future recruitment processes - only on a basis of your voluntary consent - for
                            one year counting from the end of the year in which the consent was granted. TRANSFER OF YOUR PERSONAL DATA TO THE
                            USA We may transfer your data to the USA when recruiting through global recruitment platforms (such as Zoho Recruit). You should
                            be informed that, in the absence of a decision by the European Commission on the adequacy of personal data protection, the USA
                            is treated as a third country that does not provide an adequate level of protection for personal data. For this reason, we take
                            technical and organisational steps to ensure an adequate level of security when transferring your personal data. The transfer of data
                            is secured by means of standard contractual clauses, a copy of which you can obtain by contacting us by email. YOUR RIGHTS
                            RELATED TO PERSONAL DATA PROCESSING You have the right to access your data personal, to demand rectification, erasure
                            or restriction of the processing of personal data as well as the right to data portability. If personal data is processed on the basis of
                            your consent, you have the right to withdraw it at any time. Withdrawal of consent does not affect the lawfulness of processing
                            based on consent before its withdrawal. If the personal data are processed on the basis of our legitimate interest, you have the right
                            to object to their processing due to your special situation. If you believe that your data is being processed in violation of the data
                            protection law, you have the right to lodge a complaint with the supervisory body – Prezes Urzędu Ochrony Danych Osobowych
                            (https://uodo.gov.pl/). OBLIGATION TO PROVIDE PERSONAL DATA The provision of personal data is voluntary but required to take
                            part in the recruitment process. The provision of personal data processed on the basis of your consent is voluntary, lack of consent
                            does not entail any negative consequences</p>
                    ) : (
                        <p>Be Positive IT is a data controller
                            .</p>
                    )}
                    {!showFullText && (
                        <Link style={{ color: 'grey' }} onClick={handleReadMoreClick}>Read More</Link>
                    )}
                </div>
            </div>
            <ToastContainer />

        </div>
    );
}

export default Sentry.withProfiler(App);
