import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = React.lazy(() => import("./screens/home"));

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
};

export default AppRouter;

