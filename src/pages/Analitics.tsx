import { Space, Layout } from "antd";
import { useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import styles from "./style.module.css";
import Navbar from "../components/Navbar";
import { Pie } from "@ant-design/plots";

import useStore from "../store";
import { getUserData } from "../Api";
import { groupByCity } from "../utils";

function Analitics() {
  const { chartData, setChartData } = useStore();

  const fetchUsers = () => {
    getUserData().then((resp) => {
      setChartData(groupByCity(resp.data));
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const config = {
    appendPadding: 10,
    data: chartData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Navbar />
          <Content className={styles.content}>
            <Pie {...config} />
          </Content>
        </Layout>
      </Space>
    </>
  );
}

export default Analitics;
