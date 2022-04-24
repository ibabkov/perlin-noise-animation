import * as React from 'react';

import { NextPage } from 'next';

import { StatusPage } from '../components/StatusPage';

const Page500: NextPage = () => {
  return <StatusPage title={'500'} description={"This page isn't working"} />;
};

export default Page500;
