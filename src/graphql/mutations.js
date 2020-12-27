/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Email
      City
      Date
      Time
      PhoneNumber
      Note
      createdAt
      updatedAt
      BusinessID
      CustomerID
    }
  }
`;
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Email
      City
      Date
      Time
      PhoneNumber
      Note
      createdAt
      updatedAt
      BusinessID
      CustomerID
    }
  }
`;
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
      id
      FirstName
      LastName
      Email
      City
      Date
      Time
      PhoneNumber
      Note
      createdAt
      updatedAt
      BusinessID
      CustomerID
    }
  }
`;
export const createTestData = /* GraphQL */ `
  mutation CreateTestData(
    $input: CreateTestDataInput!
    $condition: ModelTestDataConditionInput
  ) {
    createTestData(input: $input, condition: $condition) {
      id
      businessName
      businessImg
      businessPhone
      businessEmail
      businessID
      custID
      dateTime
      type
      duration
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateTestData = /* GraphQL */ `
  mutation UpdateTestData(
    $input: UpdateTestDataInput!
    $condition: ModelTestDataConditionInput
  ) {
    updateTestData(input: $input, condition: $condition) {
      id
      businessName
      businessImg
      businessPhone
      businessEmail
      businessID
      custID
      dateTime
      type
      duration
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteTestData = /* GraphQL */ `
  mutation DeleteTestData(
    $input: DeleteTestDataInput!
    $condition: ModelTestDataConditionInput
  ) {
    deleteTestData(input: $input, condition: $condition) {
      id
      businessName
      businessImg
      businessPhone
      businessEmail
      businessID
      custID
      dateTime
      type
      duration
      status
      createdAt
      updatedAt
    }
  }
`;
export const createBusinessProfile = /* GraphQL */ `
  mutation CreateBusinessProfile(
    $input: CreateBusinessProfileInput!
    $condition: ModelBusinessProfileConditionInput
  ) {
    createBusinessProfile(input: $input, condition: $condition) {
      id
      businessProfileID
      businessName
      businessAddress
      businessImg
      phoneNumber
      businessEmail
      city
      province
      postalCode
      services
      dayOpen
      workingHours
      createdAt
      updatedAt
    }
  }
`;
export const updateBusinessProfile = /* GraphQL */ `
  mutation UpdateBusinessProfile(
    $input: UpdateBusinessProfileInput!
    $condition: ModelBusinessProfileConditionInput
  ) {
    updateBusinessProfile(input: $input, condition: $condition) {
      id
      businessProfileID
      businessName
      businessAddress
      businessImg
      phoneNumber
      businessEmail
      city
      province
      postalCode
      services
      dayOpen
      workingHours
      createdAt
      updatedAt
    }
  }
`;
export const deleteBusinessProfile = /* GraphQL */ `
  mutation DeleteBusinessProfile(
    $input: DeleteBusinessProfileInput!
    $condition: ModelBusinessProfileConditionInput
  ) {
    deleteBusinessProfile(input: $input, condition: $condition) {
      id
      businessProfileID
      businessName
      businessAddress
      businessImg
      phoneNumber
      businessEmail
      city
      province
      postalCode
      services
      dayOpen
      workingHours
      createdAt
      updatedAt
    }
  }
`;
export const createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const createCustomerProfile = /* GraphQL */ `
  mutation CreateCustomerProfile(
    $input: CreateCustomerProfileInput!
    $condition: ModelCustomerProfileConditionInput
  ) {
    createCustomerProfile(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      customerProfileID
      messageDelivery
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomerProfile = /* GraphQL */ `
  mutation UpdateCustomerProfile(
    $input: UpdateCustomerProfileInput!
    $condition: ModelCustomerProfileConditionInput
  ) {
    updateCustomerProfile(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      customerProfileID
      messageDelivery
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomerProfile = /* GraphQL */ `
  mutation DeleteCustomerProfile(
    $input: DeleteCustomerProfileInput!
    $condition: ModelCustomerProfileConditionInput
  ) {
    deleteCustomerProfile(input: $input, condition: $condition) {
      id
      email
      firstName
      lastName
      customerProfileID
      messageDelivery
      createdAt
      updatedAt
    }
  }
`;
