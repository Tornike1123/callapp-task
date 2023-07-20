import create from "zustand";
import { IGroupedData, IUser } from "./type";

interface UsersList {
  setUsers: (newUsers: IUser[]) => void;
  users: IUser[];

  setChartData: (newUsers: IGroupedData[]) => void;
  chartData: IGroupedData[];
}

const useStore = create<UsersList>((set) => ({
  users: [],
  setUsers: (newUsers: IUser[]) => {
    set({ users: newUsers });
  },

  chartData: [],
  setChartData: (newUsers: IGroupedData[]) => {
    set({ chartData: newUsers });
  },
}));

export default useStore;
