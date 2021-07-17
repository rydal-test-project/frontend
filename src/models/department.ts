import Base from "./base";
import {modelData} from "../common/types";


export default class Department extends Base {
  name: string;

  constructor(data: modelData) {
    super(data);

    this.name = data.name as string;
  }
}