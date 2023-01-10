import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { BrowserTracing } from "@sentry/tracing";
import FinalScreen from './Components/TestingComponent/Testing';
import InstructionPage from "./Components/InstructionPage";
import Search from "./Components/Search";
import TestCompleted from "./Components/TestCompleted";
import RetestExhausted from "./Components/RetestExhausted";
import UserQuestionPaper from "./Components/UserQuestionPaper";
import Login from "./Components/Admin/Login";
import AdminCreatesTestComponent from "./Components/Admin/AdminCreatesTestComponent";
import { Auth } from "./contexts/auth";
import FingerFast2 from './Components/TypingTest/TypingTest/FingerFast2';
import WaitingComponent from "./Components/WaitingComponent";
import AddPosition from "./Components/Admin/AddPosition";
import * as Sentry from "@sentry/react";
import App from "./App";
import AdminLayout from "./Layouts/AdminLayout";


Sentry.init({
    dsn: process.env.REACT_APP_DSN_KEY,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="/startTest" element={<InstructionPage />} />
                <Route path="/test" element={<FinalScreen />} />
                <Route path="/table" element=
                    {<AdminLayout>
                        <Search />
                    </AdminLayout>
                    } />
                <Route path="/jobs" element=
                    {<AdminLayout>
                        <AdminCreatesTestComponent />
                    </AdminLayout>
                    } />

                <Route path="/positions" element={
                    <AdminLayout>
                        <AddPosition />
                    </AdminLayout>
                } />
                <Route path="/questionPaper/:name/:id" element=
                    {<CookiesProvider>
                        <UserQuestionPaper />
                    </CookiesProvider>
                    } />
                <Route path="/TestCompleted" element={<TestCompleted />} />
                <Route path="/retestExhasuted" element={<RetestExhausted />} />
                <Route path="/waitingComponent" element={<WaitingComponent />} />
                {/* <Route path="/testing" element={<FingerFast />} /> */}

                <Route path="/adminLogin" element=
                    {<CookiesProvider>
                        <Login />
                    </CookiesProvider>
                    } />

                <Route path="/typing-test" element=
                    {<Auth>
                        <CookiesProvider>
                            <FingerFast2 />
                        </CookiesProvider>
                    </Auth>
                    } />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

