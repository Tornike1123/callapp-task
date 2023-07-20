export type IUser = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

export type IGroupedData = {
  type: string;
  value: number;
};
