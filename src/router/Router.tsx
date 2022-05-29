import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersPage, UserPage, CommunityPage } from "pages/index";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
