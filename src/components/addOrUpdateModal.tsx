import { Button, Modal, Input, Select, Form, ModalProps } from "antd";
import { Option } from "antd/lib/mentions";

import { useEffect, useState } from "react";
import { addUser, getUserById, getUserData, updateUser } from "../Api";
import { generateRequestData, getNewId } from "../utils";
import useStore from "../store";

type addOrUpdateModalProps = {
  updateId: number | null;
} & ModalProps;

const { Option: AntOption } = Select;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const initialUserData = {
  name: "",
  email: "",
  gender: "",
  street: "",
  city: "",
  phone: "",
};

const AddOrUpdateModal = (props: addOrUpdateModalProps) => {
  const [form] = Form.useForm();
  const { users, setUsers } = useStore();

  const [userName, setUserName] = useState("");

  const fetchUsers = () => {
    getUserData().then((resp) => {
      setUsers(resp.data);
    });
  };

  const handleSubmit = async (values: any) => {
    if (props.updateId) {
      await updateUser(props.updateId, generateRequestData(values));
    } else {
      await addUser(generateRequestData(values, getNewId(users)));
    }

    fetchUsers();
  };

  const fetchById = async (id: number) => {
    try {
      const response = await getUserById(id);

      let userData = {
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender,
        street: response.data.address.street,
        city: response.data.address.city,
        phone: response.data.phone,
      };

      setUserName(response.data.name);

      form.setFieldsValue(userData);
    } catch (error) {}
  };

  useEffect(() => {
    if (props.updateId) {
      fetchById(props.updateId);
    }
  }, [props.updateId]);

  return (
    <Modal
      title={props.updateId ? `Update ${userName}` : "Add Client"}
      footer={false}
      open={props.open}
      onCancel={(e) => {
        props.onCancel?.(e);
        form.setFieldsValue(initialUserData);
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(e) => {
          handleSubmit(e);
          props.onCancel?.(e);
          form.setFieldsValue(initialUserData);
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Select>
            {genderOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Street"
          name="street"
          rules={[
            { required: true, message: "Please enter your street address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter your city" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddOrUpdateModal;
