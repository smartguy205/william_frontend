import axios from "axios";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CSVLink } from 'react-csv';
import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import { NavLink, useNavigate } from "react-router-dom";
// import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { AuthContext } from "../contexts/auth";
import Slider from '@mui/material/Slider';
import "./UserTable.css";
import * as Sentry from '@sentry/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Input, Stack, Typography, } from "@mui/material";
// import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { create } from "@mui/material/styles/createTransitions";
import { set } from "date-fns";
import { display } from "@mui/system";

const UserTable = ({ filterData }) => {
    //const { logged, setLogged, UpdateAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [duplicateData, setduplicateData] = useState([]);
    const [errMsg, setErrMsg] = useState("Loading Tests");
    // const [showCalendar, setShowCalendar] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [feedback, setFeedback] = useState(null);

    const [filter, setFilter] = useState({
        country: '',
        position: '',
        testType: '',
        rangeDate: {
            startDate: new Date(),
            endDate: new Date(),
            isFilter: false
        },
        mcqScore: {
            scores: [0, 50],
            isFilter: false
        }
    });
    const [countries, setCountries] = useState([]);
    const [positions, setPositions] = useState([]);
    const [testTypes, setTestTypes] = useState([]);


    const [arrowState, setArrowState] = useState({
        testType: 'asc',
        updatedAt: 'asc',
        fullName: 'asc',
        position: 'asc',
        country: 'asc',
        score: 'asc',
        wpm: 'asc',
        accuracy: 'asc',
        averageTime: 'asc',
        accuracy: 'asc',
        questionsAttempted: 'asc',
        correctAnswers: 'asc',
    });

    const CSVData = data;


    //get details of all tests
    const getTestDetails = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER}/admin/getTestDetails`);
            if (res.data.success) {
                setData(res.data.user)
                setduplicateData(res.data.user)

                //console.log(res.data.user);

                if (res.data.user.length > 0) {
                    const allCountries = res.data.user.map(user => {
                        return user.country
                    }).filter(country => country !== "");

                    const allPositions = res.data.user.map(user => {
                        return user.position
                    }).filter(position => position !== "");

                    const allTestTypes = res.data.user.map(user => {
                        return user.testType
                    }).filter(testType => testType !== "");


                    let allC = [...new Set(allCountries)]
                    let allP = [...new Set(allPositions)]
                    let allT = [...new Set(allTestTypes)]

                    setCountries(allC);
                    setPositions(allP);
                    setTestTypes(allT);
                }
            }
            else {
                setErrMsg(res.data.msg)
            }
        }
        catch (error) {
            toast.error(error.response.data.msg, {
                position: "top-center",
                style: { width: "28rem" }
            })
        }
    }

    useEffect(() => {
        //        if (!logged) navigate("/adminLogin", { replace: true })       else
        getTestDetails();
    }, []);



    // Sorting
    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                //   a[col]?.toString().toLowerCase() > b[col]?.toString().toLowerCase() ? 1 : -1
                // );

                typeof a[col] === 'number' ? a[col] - b[col] :
                    a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
            );

            setData(sorted);
            setOrder("DSC");
            setArrowState({ ...arrowState, [col]: "dsc" });
            setArrowState({ ...arrowState, [col]: "dsc" });
        } else {
            const sorted = [...data].sort((a, b) => {
                //   a[col]?.toString().toLowerCase() < b[col]?.toString().toLowerCase() ? 1 : -1
                // );
                //console.log(typeof a[col]);
                return typeof a[col] === 'number' ? b[col] - a[col] : a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
            });

            setData(sorted);
            setOrder("ASC");
            setArrowState({ ...arrowState, [col]: "asc" });
            setArrowState({ ...arrowState, [col]: "asc" });
        }
    };


    // filtering
    const Filter = (e) => {
        const { value, name } = e.target;
        setFilter(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // // Filter
    // useEffect(() => {
    //   let filteredCountryData = [];

    //   if (filter.position !== "") {
    //     let filteredPositionData = duplicateData.filter((item) => {
    //       return item.position === filter.position;
    //     });
    //     setData(filteredPositionData);
    //   }
    //   // else {
    //   //   setData(duplicateData)
    //   // }

    //   if (filter.country !== "") {
    //     filteredCountryData = duplicateData.filter((item) => item.country === filter.country);
    //     setData(filteredCountryData);
    //     console.log(filteredCountryData)
    //   }
    // }, [filter]);


    // getting Full Date (dd/mm/yyyy)
    const getFullDate = (createdAt) => {
        const currentDate = createdAt;
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const fullDate = `${year}-${month} -${day}`;
        return fullDate;
    }

    const filterAll = () => {
        let filteredCountryData = duplicateData;

        // position filter
        if (filter.position !== "") {
            filteredCountryData = filteredCountryData.filter((item) => {
                return item.position === filter.position;
            });
            // console.log('position', filter.position, duplicateData);
        }

        // testType filter
        if (filter.testType !== "") {
            filteredCountryData = filteredCountryData.filter((item) => {
                // console.log('test-type', item.testType, filter.testType);
                return item?.testType ? item.testType.toString() === filter.testType : item;
            });
        }

        // date filter
        if (filter.rangeDate.isFilter) {
            let startD = filter.rangeDate.startDate.toISOString();
            let endD = filter.rangeDate.endDate.toISOString();
            let arr = [];
            filteredCountryData.map(filtered => {
                if ((startD <= filtered.createdAt && endD >= filtered.createdAt) || getFullDate(new Date(endD)) == getFullDate(new Date(filtered.createdAt))) {
                    arr.push(filtered);
                }
            })
            filteredCountryData = arr;
            // filteredCountryData = filteredCountryData.filter(i => !.includes(i.id))
            // console.log('filter work', filter);
        }

        // MCQ Score Filter
        if (filter.mcqScore.isFilter) {
            filteredCountryData = filteredCountryData.filter(filtered => {
                return filtered.score >= filter.mcqScore.scores[0] && filtered.score <= filter.mcqScore.scores[1]
            });
            // console.log("FDM", filteredCountryData);
        }

        // country filter
        if (filter.country !== "") {
            filteredCountryData = filteredCountryData.filter((item) => item.country === filter.country);
            // console.log(filteredCountryData)
            // console.log('Country', filter.country, duplicateData);
        }
        setData(filteredCountryData);
        handleClose();
    };

    // Search
    useEffect(() => {
        if (filterData !== "") {
            let searchedData = duplicateData.filter((item) => {
                return item.fullName.toLowerCase().trim().includes(filterData.toLowerCase().trim());
            });
            setData(searchedData);

            searchedData.length <= 0 && setErrMsg("No tests found");
        }
        else {
            setData(duplicateData);
        }
    }, [filterData]);

    // const handleFeedback = () => {
    //   axios.get('http://localhost:5000/user/getfeedback').then((response) => {
    //     setFeedback(response.data);
    //   });
    // }
    const testTypeValue = {
        1: "MCQ's",
        2: "Typing Test",
        3: "MCQ's + Typing Test",
        4: "Typing Test + MCQ's",
    }

    const handleSelect = (date) => {
        // console.log('Select Range', date);
        setFilter({
            ...filter,
            rangeDate: {
                startDate: date.selection.startDate,
                endDate: date.selection.endDate,
                isFilter: true
            },

        });
    }

    const clearDateFilter = () => {
        setFilter({
            ...filter,
            rangeDate: {
                startDate: new Date(),
                endDate: new Date(),
                isFilter: false
            }
        })
        // console.log('Filter vala clear', filter);
    }
    // const testElement = document.getElementsByClassName('css-nen11g-MuiStack-root')

    // const hideAndShow = (event) => {
    //     event.stopPropagation()
    //     // console.log(testElement[0])
    //     // testElement[0]?.addEventListener("blur", () => console.log("hslj"))
    //     setShowCalendar(!showCalendar);
    // };

    const scoreChange = (event, marks, activeThumb) => {
        // console.log('marks', filter.mcqScore.scores, filter.mcqScore.isFilter)
        // console.log('activeThumb', activeThumb)
        if (!Array.isArray(marks)) {
            return;
        }

        setFilter({
            ...filter,
            mcqScore: {
                scores: scoreToSet(activeThumb, marks, filter.mcqScore.scores),
                isFilter: true
            }
        })
    }

    // Set marks on slider
    const scoreToSet = (activeThumb, marks, prevScore) => {
        if (activeThumb === 0) {
            return [(Math.min(marks[0], prevScore[1] - 1)), prevScore[1]];
        } else {
            return [prevScore[0], Math.max(marks[1], prevScore[0] + 1)];
        }
    }

    // Clear All Applied Filters
    const clearAllFilters = () => {
        setFilter({
            country: '',
            position: '',
            testType: '',
            rangeDate: {
                startDate: new Date(),
                endDate: new Date(),
                isFilter: false
            },
            mcqScore: {
                isFilter: false,
                scores: [0, 50]
            }
        });
        getTestDetails();
        handleClose();
    }

    return (
        <div className="userTable mt-5">

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {
                    data.length > 0 &&
                    <div className="my-3">
                        <CSVLink data={CSVData}> <button className="btn btn-dark">Download CSV File </button></CSVLink>
                    </div>
                }
                <div className="my-3" >
                    <Button variant="contained" onClick={handleOpen}>FILTER</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <div className="dropdown">
                            <div onClick={handleClose} style={{ display: 'flex', flexDirection: 'row', justifyItem: 'end', width: '100%', justifyContent: 'flex-end', marginRight: '50px', cursor: 'pointer' }}>
                                <CloseIcon />
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '20px'
                            }}>
                                <div className="mb-4">
                                    <select name="country" onChange={Filter} value={filter.country ?? undefined}>
                                        <option value="">Select Country</option>
                                        {countries.map((item, index) =>
                                            <option value={item} key={index} >{item}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <select name="position" onChange={Filter} value={filter.position ?? undefined}>
                                        <option value="">Select Position</option>
                                        {positions.map((item, index) =>
                                            <option value={item} key={index} >{item}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <div>
                                        <select name="testType" onChange={Filter} value={filter.testType ?? undefined}>
                                            <option value="">Select Test-Type</option>
                                            {testTypes.map((item, index) => {
                                                // if (index + 1 == filter.testType) {
                                                return <option value={item} key={index} >{testTypeValue[item]}</option>
                                                /* } else {
                                                     return <option value={item} key={index}>{testTypeValue[item]}</option>
                                                 }*/
                                            }
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div >
                                    <CalendarMonthIcon />
                                    <Input
                                        // onClick={hideAndShow}
                                        value={`${filter.rangeDate.startDate.toLocaleDateString("en-GB")}` + " - " + `${filter.rangeDate.endDate.toLocaleDateString("en-GB")}`} style={{ height: '24px', width: '200px' }} />
                                </div>

                                {/* showCalendar ? */}
                                <Stack>
                                    <DateRange
                                        onChange={handleSelect}
                                        ranges={[{
                                            startDate: filter.rangeDate.startDate,
                                            endDate: filter.rangeDate.endDate,
                                            key: 'selection'
                                        }]}
                                    />
                                    <Button variant="outlined" onClick={clearDateFilter}>Clear Date</Button>
                                </Stack>

                            </div>

                            <div className="mb-4" style={{ marginTop: '20px', width: '500px' }}>
                                <Slider
                                    size='medium'
                                    aria-labelledby="input-slider"
                                    value={filter.mcqScore.scores}
                                    min={0}
                                    max={50}
                                    onChange={scoreChange}
                                    valueLabelDisplay="on"
                                    disableSwap
                                />
                                <Typography id='input-slider' gutterBottom>Slide to get Marks</Typography>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '50px' }}>

                                <div className="my-3">
                                    <Button variant="contained" onClick={filterAll}>Apply</Button>
                                </div>

                                <div className="my-3">
                                    <Button variant="outlined" onClick={clearAllFilters} >Clear</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>

            {
                data.length > 0 ?
                    <table className="table table-striped">

                        <thead className="bg-dark text-light border-dark border">
                            <tr>
                                <th>Serial Number</th>
                                <th onClick={(e) => sorting("fullName")}>Name {arrowState.fullName === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} </th>
                                <th onClick={(e) => sorting("testType")}>Test Type {arrowState.testType === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} </th>
                                <th onClick={(e) => sorting("position")}>Position {arrowState.position === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} </th>
                                <th onClick={(e) => sorting("country")}>Country {arrowState.country === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("score")}>MCQs Score {arrowState.score === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("wpm")}>Words/Minute{arrowState.wpm === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("accuracy")}>Typing Accuracy{arrowState.accuracy === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("questionsAttempted")}>Questions Attempted {arrowState.questionsAttempted === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("correctAnswers")}>Questions Answered Correctly {arrowState.correctAnswers === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}   </th>
                                <th onClick={(e) => sorting("averageTime")}>
                                    Average time/Question
                                    {arrowState.averageTime === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                </th>
                                <th onClick={() => sorting("accuracy")}>
                                    Accuracy (MCQs)
                                    {arrowState.accuracy === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

                                </th>
                                <th onClick={() => sorting("cv")}>
                                    CV
                                </th>
                                <th onClick={() => sorting("updatedAt")}>Date {arrowState.updatedAt === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((val, key) => {
                                return (

                                    <tr key={key}>
                                        <td>{(key + 1)}</td>
                                        <td>
                                            <NavLink to={`/questionPaper/${val.fullName}/${val.userID}`} target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none">
                                                {val.fullName}
                                            </NavLink>
                                        </td>
                                        <td>{testTypeValue[val.testType]}</td>
                                        <td>{val.position}</td>
                                        <td>{val?.country || ""}</td>
                                        <td>{val.score}</td>
                                        <td>{val.wpm ?? "-"}</td>
                                        <td>{val.taccuracy ?? "-"}</td>
                                        <td>{val.questionsAttempted}</td>
                                        <td>{val.correctAnswers}</td>
                                        <td>{val.averageTime}</td>
                                        <td>{val.accuracy}</td>
                                        <td>
                                            {
                                                val?.file ?
                                                    <a href={val.file} target="_blank" rel="noopener noreferrer" className="fw-semibold text-decoration-none">
                                                        Click to view
                                                    </a>
                                                    :
                                                    <p>Not Found</p>
                                            }
                                        </td>
                                        <td>{moment(val.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>
                    :
                    <h1>{errMsg}</h1>
            }
            < ToastContainer />
        </div>
    );
};

export default Sentry.withProfiler(UserTable);
