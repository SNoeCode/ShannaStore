const faker = require("faker");

function generateFakeCustomers(num) {
  let customers = [];
  for (let i = 0; i < num; i++) {
    customers.push({
      id: `CUST${1000 + i}`,
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
    });
  }
  return customers;
}

console.log(generateFakeCustomers(5)); 