import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Address, Customer } from '@commercetools/platform-sdk';
import { Card } from 'antd';
import { FC } from 'react';

interface AddressCardsProps {
  customerInfo: Customer | undefined;
}

const AddressCards: FC<AddressCardsProps> = ({ customerInfo }): JSX.Element => {
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

  return (
    <div>
      {addresses.map((addr) => {
        return (
          <Card
            key={addr.id}
            title={getCardTitle(customerInfo, addr)}
            actions={[
              <EditOutlined key={addr.id?.concat('edit')} />,
              <DeleteOutlined key={addr.id?.concat('delete')} />,
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
  );
};

export default AddressCards;
