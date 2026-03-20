export const loginTestData = [
  {
    username: '',
    password: 'pass1',
    errorMessage: 'Username is required',
    scenario: 'empty username'
  },
  {
    username: 'admin',
    password: '',
    errorMessage: 'Password is required',
    scenario: 'empty password'
  }
];