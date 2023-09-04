import { BaseAddress, CustomerUpdateAction, MyCustomerDraft } from '@commercetools/platform-sdk';
import { UserAuthOptions } from '@commercetools/sdk-client-v2';
import dayjs from 'dayjs';

import { RegistrationFormType } from '../types';

import getApiRoot, { FlowTypes, changeApiClient, projectKey } from './Client';

export default class CustomerApi {
  static customerSignIn = async ({ username, password }: UserAuthOptions) => {
    changeApiClient(FlowTypes.PASSWORD, { username, password });

    const res = await getApiRoot()
      .me()
      .login()
      .post({ body: { email: username, password } })
      .execute();
    return res;
  };

  static customerSignUp = async (myCustomerDraft: MyCustomerDraft) => {
    await getApiRoot().me().signup().post({ body: myCustomerDraft }).execute();
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

  static getMyCustomerInfo = () => {
    return getApiRoot().me().get().execute();
  };

  static customerIsLoggedIn = () => {
    return localStorage.getItem(window.btoa(`${projectKey}-userClient`)) ? true : false;
  };

  static getCustomer = (customerId: string) => {
    return getApiRoot().customers().withId({ ID: customerId }).get().execute();
  };

  static getCustomerVersion = async (customerId: string) => {
    try {
      return (await CustomerApi.getCustomer(customerId)).body.version;
    } catch (error) {
      console.log('Failed to get customer version');
    }
  };

  static updateCustomer = async (customerId: string, updateActions: CustomerUpdateAction[]) => {
    const version = await this.getCustomerVersion(customerId);
    if (version) {
      await getApiRoot()
        .customers()
        .withId({ ID: customerId })
        .post({ body: { version, actions: updateActions } })
        .execute();
    }
  };

  static changePassword = async (customerId: string, currentPassword: string, newPassword: string) => {
    const version = await this.getCustomerVersion(customerId);
    if (version) {
      return getApiRoot()
        .customers()
        .password()
        .post({
          body: {
            id: customerId,
            version,
            currentPassword,
            newPassword,
          },
        })
        .execute();
    }
  };
}
