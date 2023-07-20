import { IUser, IGroupedData, IFormData, IUserWithoutId } from "./type";

export const getNewId = (users: IUser[]) => {
  return Math.max(...users.map((o) => o.id ?? 1)) + 1;
};



export const generateRequestData = (data: IFormData, id?: number) => {
  const form: IUserWithoutId = {
    name: data.name,
    email: data.email,
    gender: data.gender,
    address: {
      street: data.street,
      city: data.city,
    },
    phone: data.phone,
  };

  if (id) {
    form.id = id;
  }

  return form;
};

export const groupByCity = (data: IUser[]) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((person: IUser) => {
    const city = person.address.city;

    if (!groupedData[city]) {
      groupedData[city] = 1;
    } else {
      groupedData[city]++;
    }
  });

  const result: IGroupedData[] = Object.keys(groupedData).map((city) => ({
    type: city,
    value: groupedData[city],
  }));

  return result;
};

export const generateTableData = (data: IUser[]) => {
  const tableData = data.map((o: IUser) => ({
    ...o,
    street: o.address.street,
    city: o.address.city,
  }));

  return tableData;
};
