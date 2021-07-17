import Base from "./base";
import {modelData} from "../common/types";
import api from "../common/api";


export default class AboutInfo extends Base {
  text: string;
  title: string;

  constructor(data: modelData) {
    super(data);

    this.text = data.text as string;
    this.title = data.title as string;
  }

  static getList(): Promise<AboutInfo[]> {
    return api.get<{ [key: string]: undefined }[]>('user').then(res => res.data.map(item => new AboutInfo(item)) as AboutInfo[])
  }
}