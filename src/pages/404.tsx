import * as React from 'react';

import { NextPage } from 'next';

import { StatusPage } from '../components/StatusPage';

/** Internal Next.js 404 page */
const Page404: NextPage = () => {
  return <StatusPage title={'404'} description={'Page not found'} />;
};

export default Page404;
