import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

import AdminSidebar from "../../components/admin/AdminSidebar";
import { CurvedLineChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import data from "../../assets/data.json";
import userAuth from "../../mongodb/userAuth";
import { useState, useEffect } from "react";


const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

  
  
  
  const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stat = await userAuth.getStats(localStorage.getItem("token"));
        console.log(data);
        
        setStats(stat?.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats(); // Initial fetch

    const interval = setInterval(() => {
      fetchStats();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div>

        <section className="widget-container">
  <WidgetItem
    percent={Math.round((stats?.totalRevenue / 5000) * 100)} // Adjust denominator as needed
    amount={true}
    value={stats?.totalRevenue || 0}
    heading="Revenue"
    color="rgb(0, 115, 255)"
  />
  <WidgetItem
    percent={Math.round((stats?.totalSubscribers / 100) * 100)} // Example calculation
    value={stats?.recentUsers?.length || 0}
    color="rgb(0, 198, 202)"
    heading="Recent Users"
  />
  <WidgetItem
    percent={Math.round((stats?.totalClicks / 1000) * 100)} // Example calculation
    value={stats?.totalClicks || 0}
    color="rgb(255, 196, 0)"
    heading="Total Clicks"
  />
  <WidgetItem
    percent={Math.round((stats?.totalSubscribers / 50) * 100)} // Example calculation
    value={stats?.totalSubscribers || 0}
    color="rgb(76, 0, 255)"
    heading="Subscriptions"
  />
</section>

<section className="graph-container">
  <CurvedLineChart
    data={[
      500, 1200, 3100, 9000, 
      11000, stats?.totalRevenue || 15900, // Blend static data with real total
      17000, 20000, 23000, 25500,
      27000, 27800
    ]}
    labels={[
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]}
    label="Total Revenue"
    gradientFrom="rgba(0, 255, 164, 0.4)"
    gradientTo="rgba(0, 255, 164, 0)"
    borderColor="#00ffa4"
  />
</section>

        <section className="transaction-container">
          <div className="dashboard-categories">
            <h2>Users By country</h2>

            <div>
      {stats?.usersByCountry?.map((country) => (
        <CategoryItem
          key={country._id}
          value={Math.round((country.count / stats.recentUsers.length) * 100)}
          heading={country._id || 'Unknown'}
          color={`hsl(${Math.random() * 360}, 70%, 50%)`}
        />
      ))}
    </div>
          </div>
          <Table data={data.transaction} />
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  // color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <div className="arro">
        <h4>{amount ? `${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            {percent}% <HiTrendingUp />
          </span>
        ) : (
          <span className="red">
            {percent}% <HiTrendingDown />
          </span>
        )}
      </div>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
