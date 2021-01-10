import {Link} from "./link";

export class LinkActivity {
  id: string;
  link: Link;
  activityDate: Date;
  deviceClass: string;
  deviceName: string;
  deviceBrand: string;
  osClass: string;
  osName: string;
  osVersion: string;
  agentClass: string;
  agentName: string;
  agentVersion: string;
  agentVersionMajor: string;
}
