import React from 'react'

import Dashboard from './Dashboard/Dashboard'

// Disabled because of a bug that causes apexcharts not to render initially
// const AsyncDashboard = React.lazy(() => import('./Dashboard/Dashboard'))
const AsyncForms = React.lazy(() => import('./Forms/Forms'))
const AsyncBusinessViewAppointment = React.lazy(() => import('./BusinessViewAppointment/BusinessViewAppointment'))
const AsyncBusinessProfile = React.lazy(() => import('./BusinessProfile/BusinessProfile'))
const AsyncMessages = React.lazy(() => import('./Message/Message'))

// const AsyncTables = React.lazy(() => import('./Tables/Tables'))

export { Dashboard, AsyncForms, AsyncBusinessViewAppointment, AsyncBusinessProfile, AsyncMessages }
