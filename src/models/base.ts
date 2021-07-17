import {modelData} from "../common/types";


export default class Base {
  id: number | string;
  created_at?: string;
  updated_at?: string;

  constructor(data: modelData | Base) {
    this.id = data.id as number | string;
    this.created_at = data.created_at as string;
    this.updated_at = data.updated_at as string
  }
}