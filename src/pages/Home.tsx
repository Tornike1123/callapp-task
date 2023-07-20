import { Button, Space, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import styles from "./style.module.css";
import AddOrUpdateModal from "../components/addOrUpdateModal";
import UsersTable from "../components/UsersTable";
import Navbar from "../components/Navbar";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [updateId, setUpdateId] = useState<null | number>(null);

  const openCreateModal = () => {
    setUpdateId(null);
    setIsOpen(true);
  };

  const openUpdateModal = (id: number) => {
    setUpdateId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setUpdateId(null);
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Navbar />
          <Content className={styles.content}>
            <Button
              type="primary"
              size="large"
              onClick={openCreateModal}
              className={styles.primaryButton}
            >
              Add User
            </Button>

            <UsersTable openUpdateModal={openUpdateModal} />
          </Content>
        </Layout>
      </Space>

      <AddOrUpdateModal
        open={isOpen}
        updateId={updateId}
        onCancel={closeModal}
      />
    </>
  );
}

export default Home;
