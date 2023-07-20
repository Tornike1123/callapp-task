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

export type IFormData = {
  id?: number;
  name: string;
  email: string;
  gender: string;
  street: string;
  city: string;
  phone: string;
};

export type IUserWithoutId = Omit<IUser, "id"> & { id?: number };
