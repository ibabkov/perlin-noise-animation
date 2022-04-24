import React from 'react';

import { useApplicationState } from '../../hooks/applicationContext';

export const ApplicationContainer: React.FC = () => {
  const [state] = useApplicationState();

  return (
    <>
      <h1>Application</h1>
      <div>
        <code>{JSON.stringify(state)}</code>
      </div>
    </>
  );
};
