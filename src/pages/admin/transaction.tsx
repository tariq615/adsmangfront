import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import userAuth from "../../mongodb/userAuth"; // Update with your actual path
// import { User } from "../../types/types"; // Define or import your User type

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  country: string;
  role: string;
  subscription: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Subscription",
    accessor: "subscription",
  }
];

const Transaction = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await userAuth.getAllUsers(
        localStorage.getItem("token")
      );
      
      const mappedData = response.data.data.map((user) => ({
        avatar: (
          <img
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            src={user.avatar}
            alt={user.name}
          />
        ),
        name: user.name,
        email: user.email,
        country: user.country,
        role: user.role,
        subscription: user.isSubscribed ? "Active" : "Inactive",
        action: (
          <button onClick={() => handleDelete(user._id)}>
            <FaTrash style={{ color: "red", cursor: "pointer" }} />
          </button>
        ),
      }));

      setRows(mappedData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userAuth.deleteUser(userId, localStorage.getItem("token"));
        fetchUsers(); // Refresh the list after deletion
      } catch (err) {
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  if (loading) return <div className="admin-container">Loading...</div>;
  if (error) return <div className="admin-container">Error: {error}</div>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Transaction;