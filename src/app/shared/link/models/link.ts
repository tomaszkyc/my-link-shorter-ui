import {LinkActivity} from "./link-activity";

export class Link {
  id: number;
  userId: number;
  shortLink: string;
  longLink: string;
  creationDate: Date;
  expirationDate: Date;
  active: boolean;
  linkActivities: LinkActivity[];
}
