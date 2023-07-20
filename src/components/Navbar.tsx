import { Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { NavLink } from "react-router-dom";
import styles from "../pages/style.module.css";

const Navbar = () => {
  return (
    <Header className={styles.header}>
      <Space size="large">
        <NavLink to="/" className={styles.navLink}>
          Home
        </NavLink>
        <NavLink to="/analitics" className={styles.navLink}>
          Analitics
        </NavLink>
      </Space>
    </Header>
  );
};

export default Navbar;
