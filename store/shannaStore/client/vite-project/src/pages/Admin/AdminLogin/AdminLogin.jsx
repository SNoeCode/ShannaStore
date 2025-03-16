
import { useNavigate, Link } from "react-router-dom";
import React, {useContext,useState} from "react";
import './AdminLogin.css'
const AdminLogin= ()=> {
     const [adminCredentials, setAdminCredentials] = useState({
        username: "",
        password: "",
      })
    const handleAdminLogin = async ({role}) => {
  try {
    const adminLogin = await axios.post(
      "http://localhost:3004/api/admin/login",
      credentials,
      {
        withCredentials: true,
      }
    );
} catch(error) {
    console.log(error)
}
    }
    return (
<>
        <div className="admin-login-container">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora unde corrupti amet mollitia magnam. Reiciendis ea suscipit officiis doloremque inventore alias sapiente esse consectetur repellendus quisquam. Nesciunt perspiciatis obcaecati neque?</p>
        </div>
          <form className="admin-login-form" onSubmit={handleAdminLogin}>
          <div className="admin-form-group">
            <label>Admin Login:</label>
            <input
              id="username"
              type="text"
              onChange={(e) =>
                setAdminCredentials({ ...adminCredentials, username: e.target.value })
            }
            />
            </div>
        </form>
            </>
    )

}
export default AdminLogin