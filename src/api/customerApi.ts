import { CustomerDraft } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { message } from 'antd';

import getApiRoot, { FlowTypes, changeApiClient, projectKey } from './Client';

type NewCustomerFields = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  street?: string;
  city?: string;
  country?: string;
};

export default class CustomerApi {
  static customerSignIn = async ({ username, password }: UserAuthOptions) => {
    try {
      const res = await getApiRoot()
        .me()
        .login()
        .post({ body: { email: username, password } })
        .execute();

      changeApiClient(FlowTypes.PASSWORD, { username, password });

      const { firstName, lastName, id: customerId } = res.body.customer;
      await message.success(`Welcome ${firstName || ''} ${lastName || ''}.\nYour id is: ${customerId}`);
    } catch (error) {
      console.error(error);
      await message.error(`Login failed`); // TODO: Add reason to message
    }
  };

  static customerSignUp = async (customerDraft: CustomerDraft) => {
    try {
      await getApiRoot().customers().post({ body: customerDraft }).execute();
    } catch (error) {
      console.error(error);
    }
  };

  static createCustomerDraft = (values: NewCustomerFields): CustomerDraft => {
    const { email, password, firstName, lastName, birthday, street, city, country } = values;

    return {
      email,
      password,
      dateOfBirth: birthday || '',
      firstName: firstName || '',
      lastName: lastName || '',
      addresses: [
        {
          country: country || '',
          city: city || '',
          streetName: street || '',
        },
      ],
    };
  };

  static customerLogOut = (username: string) => {
    const tokenKey = window.btoa(`${projectKey}-${username}`);
    localStorage.removeItem(tokenKey);
    changeApiClient(FlowTypes.DEFAULT);
  };
}
