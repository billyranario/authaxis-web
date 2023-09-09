export interface IApplication {
  applicationName: string;
  applicationType: number;
  applicationTypeLabel?: string;
  callbackUrls?: any;
  crossOriginUrls?: any;
  createdAt: Date;
  description: string;
  domain: string;
  domains: IApplicationDomain[];
  id: string;
  metadata?: any;
  production?: any;
  sandbox?: any;
  settings: IApplicationSettings;
  updatedAt: Date;
  userId: number;
}

export interface IApplicationDomain {
  id: number;
  domain: string;
  environment: number;
}

export interface IApplicationSettings {
  auto_verify_email: boolean;
  enable_cross_origin: boolean;
  enable_demo_api: boolean;
  max_users?: number;
  redirect_url?: string;
  throttle: number;
  user_token_validity: number;
}

export enum EApplicationType {
  WEB = 1,
  MOBILE = 2,
}

export enum EDomainType {
  PRODUCTION = 1,
  SANDBOX = 2,
}
