import dayjs from 'dayjs';

export interface RegistrationFormType {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthday?: dayjs.Dayjs;

  billingAddress: {
    firstName?: string;
    lastName?: string;
    streetName?: string;
    additionalStreetInfo?: string;
    city?: string;
    region?: string;
    country: string;
    postalCode?: string;
    phone?: string;
  };

  shippingAddress: {
    firstName?: string;
    lastName?: string;
    streetName?: string;
    additionalStreetInfo?: string;
    city?: string;
    region?: string;
    country: string;
    postalCode?: string;
    phone?: string;
  };

  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
  shippingAsBilling?: boolean;
}
