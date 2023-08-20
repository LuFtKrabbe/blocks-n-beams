import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import { message } from 'antd';
import dayjs from 'dayjs';

import { RegistrationFormType } from '../types';

import getApiRoot, { FlowTypes, changeApiClient, projectKey } from './Client';

export default class CustomerApi {
  static customerSignIn = async ({ username, password }: UserAuthOptions) => {
    try {
      const res = await getApiRoot()
        .me()
        .login()
        .post({ body: { email: username, password } })
        .execute();

      changeApiClient(FlowTypes.PASSWORD, { username, password });

      await this.getMyCustomerInfo(); // New user tokens stored in localStorage only after first request. So force it.

      const { firstName, lastName, id: customerId } = res.body.customer;
      await message.success(`Welcome ${firstName || ''} ${lastName || ''}.\nYour id is: ${customerId}`); // TODO: Remove notifications from api handlers
    } catch (error) {
      console.error(error);
      await message.error(`Login failed`); // TODO: Add reason to message
    }
  };

  static customerSignUp = async (myCustomerDraft: MyCustomerDraft) => {
    try {
      await getApiRoot().me().signup().post({ body: myCustomerDraft }).execute();
    } catch (error) {
      console.error(error);
    }
  };

  static createMyCustomerDraft = (values: RegistrationFormType): MyCustomerDraft => {
    const {
      email,
      password,
      firstName,
      lastName,
      birthday,
      billingAddress,
      shippingAddress,
      isDefaultBillingAddress,
      isDefaultShippingAddress,
      shippingAsBilling,
    } = values;

    const billingAddressIndex = 0;
    const shippingAddressIndex = 1;
    const addresses: BaseAddress[] = [billingAddress, shippingAddress];

    if (shippingAsBilling) {
      addresses[shippingAddressIndex] = billingAddress;
    }

    let customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName: firstName || '',
      lastName: lastName || '',
      dateOfBirth: dayjs(birthday).format('YYYY-MM-DD'),
      addresses,
    };

    if (isDefaultShippingAddress) {
      customerDraft = { ...customerDraft, defaultShippingAddress: shippingAddressIndex };
    }

    if (isDefaultBillingAddress) {
      customerDraft = { ...customerDraft, defaultBillingAddress: billingAddressIndex };
    }

    return customerDraft;
  };

  static customerLogOut = () => {
    const tokenKey = window.btoa(`${projectKey}-userClient`);
    localStorage.removeItem(tokenKey);
    changeApiClient(FlowTypes.DEFAULT);
  };

  static getMyCustomerInfo = async () => {
    try {
      return await getApiRoot().me().get().execute();
    } catch (error) {
      console.error(error);
    }
  };

  static customerIsLoggedIn = () => {
    return localStorage.getItem(window.btoa(`${projectKey}-userClient`)) ? true : false;
  };
}
