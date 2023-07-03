let addresses = [];
  
  const getAddresses = (email) => {
    return new Promise((resolve) => {
      const addressData = addresses.find((item) => item.email === email);
      const addressesArray = addressData ? addressData.addresses : [];
      resolve(addressesArray);
    });
  };
  
const updateAddresses = (email, newAddress) => {
  const index = addresses.findIndex(item => item.email === email);
  if (index !== -1) {
    addresses[index].addresses.push(newAddress);
  } else {
    addresses.push({
      email: email,
      addresses: [newAddress]
    });
  }
  console.log(addresses);
};

export { getAddresses, updateAddresses };
