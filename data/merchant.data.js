import path from 'path'; // <-- ADD THIS LINE AT THE TOP

export const merchantData = {
  admin: {
    email: 'admin-tools@xstak.com',
    password: 'Admin12345@',
  },

  business: {
   name: '', // will be set dynamically
    type: 'Partnership',
    industry: 'E-Commerce / Online Retaill',
    email: 'aima.rauf@shopdev.co',
    contact: '123456789',
    ntn: '12345678',
    website: 'google.com',
    province: 'Punjab',
    city: 'Abbaspur',
    address: 'lahore',
    platform: 'WooCommerce',
  },

  owner: {
    fullName: 'xxyy',
    email: 'aima.rauf@shopdev.co',
    cnic: '1234567891234',
    contact: '123456789',
    designation: 'xy',
  },

  bank: {
    name: 'National Bank of Pakistan',
    accountNumber: '12345678',
    iban: 'PK36SCBL0000001123456702',
    title: 'xy',
    frequency: 'T+1',
  },

  files: {
    logo: path.join(
      process.cwd(),
      'uploads',
      'cypress1.png'
    ),
    document: path.join(
      process.cwd(),
      'uploads',
      'cypress1.png'
    ),
  },


};
