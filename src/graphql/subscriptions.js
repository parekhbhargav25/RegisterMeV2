/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment {
    onCreateAppointment {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment {
    onUpdateAppointment {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment {
    onDeleteAppointment {
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
export const onCreateTestData = /* GraphQL */ `
  subscription OnCreateTestData {
    onCreateTestData {
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
export const onUpdateTestData = /* GraphQL */ `
  subscription OnUpdateTestData {
    onUpdateTestData {
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
export const onDeleteTestData = /* GraphQL */ `
  subscription OnDeleteTestData {
    onDeleteTestData {
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
export const onCreateBusinessProfile = /* GraphQL */ `
  subscription OnCreateBusinessProfile {
    onCreateBusinessProfile {
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
export const onUpdateBusinessProfile = /* GraphQL */ `
  subscription OnUpdateBusinessProfile {
    onUpdateBusinessProfile {
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
export const onDeleteBusinessProfile = /* GraphQL */ `
  subscription OnDeleteBusinessProfile {
    onDeleteBusinessProfile {
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
export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages {
    onCreateMessages {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages {
    onUpdateMessages {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages {
    onDeleteMessages {
      id
      Message
      ProfileID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCustomerProfile = /* GraphQL */ `
  subscription OnCreateCustomerProfile {
    onCreateCustomerProfile {
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
export const onUpdateCustomerProfile = /* GraphQL */ `
  subscription OnUpdateCustomerProfile {
    onUpdateCustomerProfile {
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
export const onDeleteCustomerProfile = /* GraphQL */ `
  subscription OnDeleteCustomerProfile {
    onDeleteCustomerProfile {
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
