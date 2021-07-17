import {User, userStore} from "./user";
import {createContext} from "react";


export interface IStores {
  userStore: User
}

const stores: IStores = {
  userStore
};

export const storesContext = createContext<IStores>(stores);

export default stores;