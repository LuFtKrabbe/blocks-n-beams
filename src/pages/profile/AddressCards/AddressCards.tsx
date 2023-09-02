import { DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import { Address, Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { Button, Card, Form, Popconfirm, message } from 'antd';
import { FC, useState } from 'react';

import CustomerApi from '../../../api/customerApi';
import { ChangeAddressForm } from '../../../types';

import EditAddressModal from './modals/EditAddressModal';

interface AddressCardsProps {
  customerInfo: Customer | undefined;
}

const AddressCards: FC<AddressCardsProps> = ({ customerInfo }): JSX.Element => {
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string>('');
  const [editAddressForm] = Form.useForm<ChangeAddressForm>();

  if (customerInfo === undefined) {
    return <div></div>;
  }

  const { addresses } = customerInfo;

  const getCardTitle = (customerInfo: Customer, addressInfo: Address): string => {
    if (customerInfo.defaultBillingAddressId === addressInfo.id) {
      return 'Default Billing Address';
    }
    if (customerInfo.defaultShippingAddressId === addressInfo.id) {
      return 'Default Shipping Address';
    }
    return '';
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

  const removeAddress = (addr: Address) => {
    const updateActions: CustomerUpdateAction[] = [{ action: 'removeAddress', addressId: addr.id }];

    const fetchUpdate = async () => {
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

    void fetchUpdate();
  };

  return (
    <>
      <div>
        {addresses.map((addr) => {
          return (
            <Card
              key={addr.id}
              title={getCardTitle(customerInfo, addr)}
              actions={[
                <Button
                  type="text"
                  key={addr.id?.concat('edit')}
                  title="Edit"
                  onClick={() => showEditAddressModal(addr)}
                >
                  <EditOutlined />
                </Button>,
                <Button type="text" key={addr.id?.concat('defBilling')} title="Set As Default Billing Address">
                  <StarOutlined />
                </Button>,
                <Button type="text" key={addr.id?.concat('defShipping')} title="Set As Default Shipping Address">
                  <StarOutlined />
                </Button>,
                <Popconfirm
                  key={addr.id?.concat('popConfirm')}
                  title="Are you sure that you want to delete this address?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => removeAddress(addr)}
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
          );
        })}
      </div>
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
