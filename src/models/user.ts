import { types } from 'mobx-state-tree'
import { userModelLogger } from "../debug";
import {userDataResponse} from "../common/types";


export const FioModel = types.model('Fio', {
  name: types.maybeNull(types.string),
  surname: types.maybeNull(types.string),
  patronymic: types.maybeNull(types.string),
}).actions(self => ({
  setInfo: (payload: { name: string, surname: string, patronymic: string }) => {
    self.name = payload.name;
    self.surname = payload.surname;
    self.patronymic = payload.patronymic;
  }
})).views(self => ({
  shortFio (): string | null {
    return self.patronymic && self.name && self.surname &&
      `${self.patronymic} ${self.name.charAt(0)}. ${self.surname.charAt(0)}.`
  },
  fullFio (): string | null {
    return self.patronymic && self.name && self.surname &&
      `${self.patronymic} ${self.name}. ${self.surname}.`
  },
}));
const UserModel = types.model('User', {
  id: types.optional(types.number, -1),
  fio: types.maybe(FioModel),
  email: types.optional(types.string, ''),
  phone_number: types.maybeNull(types.string),
  isInit: types.optional(types.boolean, false),
}).actions(self => ({
  setInfo: (payload: userDataResponse) => {
    const { name, surname, patronymic } = payload;

    self.fio = FioModel.create({ name, surname, patronymic });
    self.id = payload.id;
    self.isInit = true;
    self.email = payload.email;
    self.phone_number = payload.phone_number;
  }
}));

export default UserModel
