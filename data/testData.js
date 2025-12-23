// data/testData.js
export const testData = {
  baseURL: "https://xpay-app-stage.postexglobal.com",

  user: {
    accountId: '0ddb82950784f875',
    email: 'aima.rauf@shopdev.co',
    password: 'Aima123!'
  },

  invalidUser: {
    accountId: 'wrong-id',
    email: 'invalid@example.com',
    password: 'wrongpassword'
  },

  expectedInvalidError: 'Something went wrong.',

  subscription: {
    namePrefix: 'e2e-sub'
  },
  

  validProduct: {
    name: 'xxxyyy',
    description: 'the',
    price: 5,
    currency: 'PKR',
    feature: 'good',
  },

 validPlan: {
    price: 5,
    currency: "PKR",
    every: 1,
    interval: "Year",
    description: "the",
    productName: "xxxyyy",
  },

  validCustomer: {
    firstName: "xxx",
    lastName: "yyy",
    email: "aima.rauf@shopdev.co",
    phone: "0312345678"
  },

  gateway: {
    name: "BAFL Test",
    merchantId: "TESTXSTAK1",
    username: "merchant.TESTXSTAK1",
    apiPassword: "70e89351e12bbc2bbe1ac6cc89614870",
    webhookSecret: "A1CF96E73D0D1DFBF42ACC691988A887",
    enable: true,
    default: true,
  },

  bafl: {
    gatewayId: "6",
    gatewayName: "BAFL Test",
    link: "https://stage.xta.ac/597d6f",
    amount: 5,
    email: "aima.rauf@shopdev.co",
    cardName: "xyz",
    cardNumber: "5123 4500 0000 0008",
    expiry: "01/39",
    cvc: "100"
  },

  jazzcash: {
    gatewayId: "14",
    gatewayName: "XPay Jazzcash Wallet",
    link: "https://stage.xta.ac/35ae73",
    amount: 5,
    phone: "0312-3456789",
    cnicLast6: "345678"
  },

  paymentLink: {
    orderId: "76546754",
    amount: "5",
    gateway: "BAFL Test",
    namePrefix: "e2e-link"
  },

  storeName: "GPay Stage Testing",

  stores: {
    default: 'Testing store'
  },

  filters: {
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    gateways: ['Bank Alfalah (MPGS)', 'JazzCash', 'EasyPaisa'],
    paymentMethods: ['CARD PAYMENT', 'WALLET PAYMENT', 'TOKEN PAYMENT']
  },

  transaction: {
    sampleId: 'sample-tx-1234'
  },


    paymentLinkMultipleUse: {
  namePrefix: "e2e-multi-use",
  usageType: "Multiple Use",
  usageLimit: 6,
  amount: 5,

  // Gateway 1 → BAFL 3DS
  firstPayment: {
    method: "Credit Card",
    gatewayName: "BAFL Test",
    email: "aima.rauf@shopdev.co", // added email
    cardName: "xyz",
    cardNumber: "5123 4500 0000 0008",
    expiry: "01/39",
    cvc: "100"
  },

  // Gateway 2 → JazzCash Wallet
  secondPayment: {
    method: "JazzCash",
    phone: "0312-3456789",
    cnicLast6: "345678"
  },

  expected: {
    after1stPayment: {
      usedCount: 1,
      limit: 6,
      status: "Active"
    },
    after2ndPayment: {
      usedCount: 2,
      limit: 6,
      status: "Active"
    },
    afterExpire: {
      status: "Expired"
    }
  }
  
  },
// Added multiple-use payment info
paymentLinkMultiUseBAFL: {
  amount: 1000,
  usageLimit: 3
},

paymentLinkMultiUseJazzCash: {
  amount: 500,
  usageLimit: 2
},
  dateRanges: ["Last 7 Days", "Last 30 Days"],

  paymentMethods: ["CARD PAYMENT", "WALLET PAYMENT", "TOKEN PAYMENT"],

  gateways: ["Bank Alfalah (MPGS)", "JazzCash", "EasyPaisa"]
};
