import { Modal, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import useStore from "../store";
import { deleteUser, getUserData } from "../Api";
import { generateTableData } from "../utils";

const UsersTable = ({
  openUpdateModal,
}: {
  openUpdateModal?: (id: number) => void;
}) => {
  const { users, setUsers } = useStore();

  const fetchUsers = () => {
    getUserData().then((resp) => {
      setUsers(resp.data);
    });
  };

  const deleteItem = (record: any) => {
    Modal.confirm({
      title: "Are u sure, you want to delete",
      onOk: async () => {
        await deleteUser(record.id);
        fetchUsers();
      },
    });
  };

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "5",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "6",
      title: "Street",
      dataIndex: "street",
    },
    {
      key: "7",
      title: "City",
      dataIndex: "city",
    },
    {
      key: "8",
      render: (record: any) => {
        return (
          <DeleteOutlined
            onClick={() => {
              deleteItem(record);
            }}
          />
        );
      },
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={generateTableData(users)}
      onRow={(record) => ({
        onDoubleClick: () => {
          if (!record.id) return;
          openUpdateModal?.(record.id);
        },
      })}
    />
  );
};

export default UsersTable;
