import React from 'react';

import {
  TApplicationContext,
  IApplicationState,
  TApplicationStateModifier,
} from '../../types/applicationContext';
import { APPLICATION_INITIAL_CONTEXT } from '../../constants/applicationContext';

const ApplicationContext = React.createContext<TApplicationContext>(
  APPLICATION_INITIAL_CONTEXT
);

export const useApplicationState = () => React.useContext(ApplicationContext);

export const useApplicationContext = () => ApplicationContext;

export const useCreateApplicationContext = (): TApplicationContext => {
  const [state, setState] = React.useState<IApplicationState>(
    APPLICATION_INITIAL_CONTEXT[0]
  );
  const applicationStateModifier = React.useCallback(
    (transformer: TApplicationStateModifier) => {
      setState({ ...state, ...transformer(state) });
    },
    [state]
  );

  return React.useMemo(
    () => [state, applicationStateModifier],
    [state, applicationStateModifier]
  );
};

export const useModifyApplicationState = <T>(
  modifier: (params: T) => TApplicationStateModifier
): ((params: T) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setState] = useApplicationState();

  return React.useCallback(
    (params) => setState(modifier(params)),
    [setState, modifier]
  );
};
