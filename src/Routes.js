import React, { useState, useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { RouteWithLayout } from "./common";
import { Auth } from 'aws-amplify';
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import axios from 'axios';
import {
  Home as HomeView,
  NotFound as NotFoundView,
  // bookAppointment,
  SignupBusiness as SignupBusinessView,
  ListAllBusinesses as ListAllBusinessesView,
  SignupCustomer as SignupCustomerView,
  Signin as SigninView,
  createAppointment as appointmentView,
  Dashboard as DashboardView,
  SignupLanding as SignupLandingView,
  BusinessViewApointment as BusinessViewApointment,
  DetailAppointment as DetailAppointmentView,
  SuccessForm,
  UpdateBusiness as UpdateBusinessView,
  CustomerAppointment as CustomerAppointment,
  Message as MessageView,
  ForgotPassword as ForgotPasswordView,
  UpdateCustomer as UpdateCustomerView,
  UpdateBusinessOLD as UpdateBusinessOLDView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={SignupBusinessView}
        exact
        layout={MinimalLayout}
        path="/business/sign-up"
      />
      <RouteWithLayout
        component={ListAllBusinessesView}
        exact
        layout={MinimalLayout}
        path="/salons"
      />
      <RouteWithLayout
        component={SignupCustomerView}
        exact
        layout={MinimalLayout}
        path="/customer/sign-up"
      />
      <RouteWithLayout
        component={SigninView}
        exact
        layout={MinimalLayout}
        path="/signin"
      />
      <RouteWithLayout
        component={appointmentView}
        exact
        layout={MinimalLayout}
        path="/bookappointment"
      />
      <RouteWithLayout
        component={SuccessForm}
        exact
        layout={MainLayout}
        path="/Success"
      />

      <Route
        component={DashboardView}
        exact
        path="/account/:id12"
      />

      <Route
        component={DashboardView}
        exact
        path="/account/business_View/"
      />

      <Route
        component={SignupLandingView}
        exact
        layout={MinimalLayout}
        path="/signup"
      />
      <RouteWithLayout
        component={BusinessViewApointment}
        exact
        layout={MinimalLayout}
        path="/businessView"
      />
      <RouteWithLayout
        component={DetailAppointmentView}
        exact
        layout={MinimalLayout}
        path="/businessView/:id" 
      />
      
      <RouteWithLayout
        component={UpdateBusinessView}
        exact
        layout={MinimalLayout}
        path="/update-business/:id12"
      />
      <RouteWithLayout
        component={UpdateBusinessOLDView}
        exact
        layout={MinimalLayout}
        path="/update-business-old/:id12"
      />
      <RouteWithLayout 
        component={MessageView}
        exact
        layout={MinimalLayout}
        path="/messages"
      />
      <RouteWithLayout
        component={ForgotPasswordView}
        exact
        layout={MinimalLayout}
        path="/forgot-password"
      />

      <RouteWithLayout 
        component={CustomerAppointment}
        exact
        layout={MinimalLayout}
        path="/CustomerAppointment"
      />  
      
      <RouteWithLayout
        component={UpdateCustomerView}
        exact
        layout={MinimalLayout}
        path="/update-customer/:id12"
      />

      <Redirect to="/not-found" status="404" />
    </Switch>
  );
};

export default Routes;
