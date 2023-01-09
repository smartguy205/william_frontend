import React, { useState } from "react";
import UserTable from "./UserTables";
import "./Search.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import * as Sentry from '@sentry/react';

const Search = () => {
    const [filterData, setFilterData] = useState("");


    return (
        <>
            <div className="container-fluid">
                <div className="searchBox mt-5 container-fluid">
                    <input
                        className="form-control w-50 mx-auto"
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setFilterData(e.target.value)}
                    />
                    <UserTable filterData={filterData} />
                </div>
            </div>
        </>
    );
};

export default Sentry.withProfiler(Search);
