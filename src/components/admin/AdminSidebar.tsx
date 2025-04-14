import { useEffect, useState } from "react";
import { FaChartLine, FaUser } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPaper, IoMdLogOut } from "react-icons/io";
import { RiAdvertisementFill, RiHomeFill } from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { IoNotifications } from "react-icons/io5";
import { PiNotePencilBold } from "react-icons/pi";

const AdminSidebar = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <div className="logo">
          <img src="/lg1.png" alt="icon" />
          <img src="/lg2.png" alt="WeeShare" />
        </div>

        <div className="sidefields">
          <DivOne location={location} />
          <DivTwo location={location} />
        </div>

        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiHomeFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Notifications"
        Icon={IoNotifications}
        location={location}
      />
      <Li
        url="/admin/users"
        text="Users"
        Icon={FaUser}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Flagged Posts"
        Icon={IoIosPaper}
        location={location}
      />
      <Li
        url="#"
        text="Advertisements"
        Icon={RiAdvertisementFill}
        location={location}
      />
      <Li
        url="/admin/blog"
        text="Blogs"
        Icon={PiNotePencilBold}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <ul>
      <Li
        url="/"
        text="Logout"
        Icon={IoMdLogOut}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      background: location.pathname.includes(url)
        ? "linear-gradient(to right, #8E45FD, #2EAFFE)"
        : "#19161C",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? "white" : "#AEB9E1",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
