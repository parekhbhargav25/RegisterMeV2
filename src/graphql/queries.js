/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
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
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getTestData = /* GraphQL */ `
  query GetTestData($id: ID!) {
    getTestData(id: $id) {
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
export const listTestDatas = /* GraphQL */ `
  query ListTestDatas(
    $filter: ModelTestDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestDatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBusinessProfile = /* GraphQL */ `
  query GetBusinessProfile($id: ID!) {
    getBusinessProfile(id: $id) {
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
export const listBusinessProfiles = /* GraphQL */ `
  query ListBusinessProfiles(
    $filter: ModelBusinessProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinessProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getMessages = /* GraphQL */ `
  query GetMessages($id: ID!) {
    getMessages(id: $id) {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const listMessagess = /* GraphQL */ `
  query ListMessagess(
    $filter: ModelMessagesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Message
        ProfileID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomerProfile = /* GraphQL */ `
  query GetCustomerProfile($id: ID!) {
    getCustomerProfile(id: $id) {
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
export const listCustomerProfiles = /* GraphQL */ `
  query ListCustomerProfiles(
    $filter: ModelCustomerProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        firstName
        lastName
        customerProfileID
        messageDelivery
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
