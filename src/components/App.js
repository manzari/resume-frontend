import '../styles/App.scss';
import React from "react";
import LoginPage from "./LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RequireAuth from "./RequireAuth";
import {AuthProvider} from "./useAuth";
import AdminLoginPage from "./AdminLoginPage";
import ResumePage from "./ResumePage";
import UsersPage from "./UsersPage";
import FilesPage from "./FilesPage";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/:urlOtp" element={<LoginPage/>}/>
                    <Route path="/resume" element={
                        <RequireAuth roles={['USER', 'ADMIN']} loginUrl="/login">
                            <ResumePage/>
                        </RequireAuth>
                    }/>
                    <Route path="/users" element={
                        <RequireAuth roles={['ADMIN']} loginUrl="/admin-login">
                            <UsersPage/>
                        </RequireAuth>
                    }/>
                    <Route path="/files" element={
                        <RequireAuth roles={['ADMIN']} loginUrl="/admin-login">
                            <FilesPage/>
                        </RequireAuth>
                    }/>
                    <Route path="/admin-login" element={<AdminLoginPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;