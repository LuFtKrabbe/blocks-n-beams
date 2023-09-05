import { DeleteOutlined, EditOutlined, StarTwoTone } from '@ant-design/icons';
import { Address, Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { Button, Card, Col, Form, Popconfirm, Row, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import style from '../profile.module.css'

import CustomerApi from '../../../api/customerApi';
import { ChangeAddressForm } from '../../../types';

import EditAddressModal from './modals/EditAddressModal';

interface AddressCardsProps {
  customerInfo: Customer | undefined;
  setCustomerInfo: React.Dispatch<React.SetStateAction<Customer | undefined>>;
  addressUpdateCounter: number;
  setAddressUpdateCounter: React.Dispatch<React.SetStateAction<number>>;
}

const AddressCards: FC<AddressCardsProps> = ({
  customerInfo,
  setCustomerInfo,
  addressUpdateCounter,
  setAddressUpdateCounter,
}): JSX.Element => {
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string>('');
  const [editAddressForm] = Form.useForm<ChangeAddressForm>();

  useEffect(() => {
    const customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : '';
    if (customerId) {
      const fetchData = async () => {
        try {
          const res = await CustomerApi.getMyCustomerInfo();
          setCustomerInfo(res.body);
        } catch (error) {
          if (error instanceof Error) {
            await message.error(`Failed. ${error.message}`);
          }
        }
      };
      void fetchData();
    }
  }, [addressUpdateCounter, isEditAddressModalOpen]);

  if (customerInfo === undefined) {
    return <div></div>;
  }

  const { addresses } = customerInfo;

  const getCardTitle = (customerInfo: Customer, addressInfo: Address): string => {
    if (
      customerInfo.defaultBillingAddressId === addressInfo.id &&
      customerInfo.defaultShippingAddressId === addressInfo.id
    ) {
      // if's order matter
      return 'Default Billing and Shipping Address';
    }
    if (customerInfo.defaultBillingAddressId === addressInfo.id) {
      return 'Default Billing Address';
    }
    if (customerInfo.defaultShippingAddressId === addressInfo.id) {
      return 'Default Shipping Address';
    }
    return ' ';
  };

  const showEditAddressModal = (addr: Address) => {
    if (addr.id) {
      setEditingAddressId(addr.id);
      setIsEditAddressModalOpen(true);
      editAddressForm.setFieldsValue({
        firstName: addr.firstName,
        lastName: addr.lastName,
        streetName: addr.streetName,
        additionalStreetInfo: addr.additionalStreetInfo,
        city: addr.city,
        region: addr.region,
        country: addr.country,
        postalCode: addr.postalCode,
        phone: addr.phone,
      });
    }
  };

  const removeAddress = async (addr: Address) => {
    const updateActions: CustomerUpdateAction[] = [{ action: 'removeAddress', addressId: addr.id }];

    const fetchUpdate = async () => {
      // TODO: Refactor. A lot of almost duplicated code.
      try {
        if (customerInfo?.id) {
          await CustomerApi.updateCustomer(customerInfo?.id, updateActions);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to remove address. ${error.message}`);
        }
      }
    };

    await fetchUpdate();
    setAddressUpdateCounter(addressUpdateCounter + 1);
  };

  const setDefaultBillingAddress = async (addr: Address) => {
    const updateActions: CustomerUpdateAction[] = [{ action: 'setDefaultBillingAddress', addressId: addr.id }];

    const fetchSetDefaultBillingAddress = async () => {
      // TODO: Refactor. A lot of almost duplicated code.
      try {
        if (customerInfo?.id) {
          await CustomerApi.updateCustomer(customerInfo?.id, updateActions);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to set default billing address. ${error.message}`);
        }
      }
    };

    await fetchSetDefaultBillingAddress();
    setAddressUpdateCounter(addressUpdateCounter + 1);
  };

  const setDefaultShippingAddress = async (addr: Address) => {
    const updateActions: CustomerUpdateAction[] = [{ action: 'setDefaultShippingAddress', addressId: addr.id }];

    const fetchSetDefaultShippingAddress = async () => {
      // TODO: Refactor. A lot of almost duplicated code.
      try {
        if (customerInfo?.id) {
          await CustomerApi.updateCustomer(customerInfo?.id, updateActions);
        }
      } catch (error) {
        if (error instanceof Error) {
          await message.error(`Failed to set default shipping address. ${error.message}`);
        }
      }
    };

    await fetchSetDefaultShippingAddress();
    setAddressUpdateCounter(addressUpdateCounter + 1);
  };

  return (
    <>
      <Row gutter={16}>
        {addresses.map((addr) => {
          return (
            <Col key={addr.id}>
              <Card
                key={addr.id?.concat('card')}
                title={getCardTitle(customerInfo, addr)}
                size={'small'}
                className={style.addressCard}
                actions={[
                  <Button
                    type="text"
                    key={addr.id?.concat('edit')}
                    title="Edit"
                    onClick={() => showEditAddressModal(addr)}
                  >
                    <EditOutlined />
                  </Button>,
                  <Button
                    type="text"
                    key={addr.id?.concat('defBilling')}
                    title="Set As Default Billing Address"
                    onClick={() => void setDefaultBillingAddress(addr)}
                  >
                    <StarTwoTone twoToneColor="#c48c1a" />
                  </Button>,
                  <Button
                    type="text"
                    key={addr.id?.concat('defShipping')}
                    title="Set As Default Shipping Address"
                    onClick={() => void setDefaultShippingAddress(addr)}
                  >
                    <StarTwoTone twoToneColor="#52c41a" />
                  </Button>,
                  <Popconfirm
                    key={addr.id?.concat('popConfirm')}
                    title="Are you sure that you want to delete this address?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => void removeAddress(addr)}
                  >
                    <Button type="text" key={addr.id?.concat('delete')} title="Remove Address">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <p>First Name: {addr.firstName}</p>
                <p>Last Name: {addr.lastName}</p>
                <p>Address Line 1: {addr.streetName}</p>
                <p>Address Line 2: {addr.additionalStreetInfo}</p>
                <p>City: {addr.city}</p>
                <p>Region: {addr.region}</p>
                <p>Country: {addr.country}</p>
                <p>Postal Code: {addr.postalCode}</p>
                <p>Phone: {addr.phone}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
      <EditAddressModal
        isEditAddressModalOpen={isEditAddressModalOpen}
        setIsEditAddressModalOpen={setIsEditAddressModalOpen}
        form={editAddressForm}
        customerInfo={customerInfo}
        editingAddressId={editingAddressId}
        setEditingAddressId={setEditingAddressId}
      />
    </>
  );
};

export default AddressCards;
