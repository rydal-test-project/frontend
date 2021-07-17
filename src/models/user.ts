import Base from "./base";
import {modelData} from "../common/types";
import Group from "./group";
import Department from "./department";


export default class User extends Base {
  name: string;
  surname: string;
  patronymic: string;
  fullFio: string;
  shortFio: string;
  group?: Group | null;
  department?: Department | null;

  constructor(data: modelData | User) {
    super(data);

    this.name = data.name as string;
    this.surname = data.surname as string;
    this.patronymic = data.patronymic as string;
    this.fullFio = (this.name && this.patronymic && this.surname) ? `${this.surname} ${this.name} ${this.patronymic}` : '';
    this.shortFio = (this.name && this.patronymic && this.surname) ?  `${this.surname} ${this.name[0]}. ${this.patronymic[0]}.` : '';
    this.group = data.group ? data.group as Group : null;
    this.department = data.department ? data.department as Department : null;
  }
}