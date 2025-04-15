import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
// Admin imports

const Signup = lazy(() => import("./pages/Signup"));
const Start = lazy(() => import("./pages/Start"));
const Blog = lazy(() => import("./pages/Blog"));
const AllBlog = lazy(() => import("./pages/admin/AllBlog"));
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Users = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const App = () => {
  return (
    <div className="image-wrapper">
      {/* Background Images */}
      <img src="/bg-1.png" alt="Top left" className="top-left-img" />
      <img src="/bg-2.png" alt="bottom right" className="bottom-right-img" />
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
          >
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/blog" element={<Blog />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/blogs" element={<AllBlog />} />

          </Route> 
        </Routes>
      </Suspense>
    </Router>
    </div>
  );
};
export default App;
