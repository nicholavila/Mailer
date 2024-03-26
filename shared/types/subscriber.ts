export type Subscriber = {
  id?: string;
  userEmail: string;
  subscriberEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  // birthday: string;
  birthday: Date;
  tags?: string[];
  subscribed?: boolean;
  contactRating?: number;
  // created?: string;
  created?: Date;
  // lastChanged?: string;
  lastChanged?: Date;
};
