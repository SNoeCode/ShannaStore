import React from "react";
import AdminLogin from "../../pages/Admin/AdminLogin/AdminLogin";
// import Layout from "./../../components/Layout/Layout";
import { UserContext} from "../../context/UserContext";
const AdminDashboard = () => {
  const [authedAdmin] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminLogin />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {authedUser?.user?.name}</h3>
              <h3> Admin Email : {authedUser?.user?.email}</h3>
              <h3> Admin Contact : {authedUser?.user?.userId}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;