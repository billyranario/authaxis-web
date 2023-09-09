import { IApplication } from '../../applications/interfaces/applications.interface';

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  emailVerifiedAt?: Date;
  suffix: string;
  userType: number;
  createdAt: Date;
  updatedAt: Date;
  metadata: IMetadata;
  applications: IApplication[];
}

export interface IMetadata {
  userMetadata?: any;
  appMetadata?: any;
}
