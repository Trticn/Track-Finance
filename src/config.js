export const INCOME_CATEGORIES = [
    'Salary',
    'Freelance',
    'Investments',
    'Gifts',
    'Rental Income',
    'Business',
    'Savings Interest',
    'Other'
  ];
  
  export const EXPENSE_CATEGORIES = [
    'Food',
    'Transport',
    'Investments',
    'Housing',
    'Entertainment',
    'Shopping',
    'Health',
    'Utilities',
    'Education',
    'Travel',
    'Insurance',
    'Debt Payments',
    'Donations',
    'Subscriptions',
    'Pets'
  ];

  export const ALL_CATEGORIES = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];

export const SOURCES = [

    'Cash',
    'Bank Account',
    'Credit Card',
    'Debit Card',
    'PayPal',
    'Crypto',
    'Mobile Wallet',
    'Employer Account',
    'Other'
 ]
  