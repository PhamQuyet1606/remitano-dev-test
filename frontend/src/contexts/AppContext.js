import React, {useReducer, createContext, useEffect} from 'react';
import {appReducer, initialState} from '../reducers';
import * as ACTIONS from '../actions';

export const AppContext = createContext({
    state: initialState,
    dispatch: () => null
});

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        dispatch(ACTIONS.auth_init());
        dispatch(ACTIONS.fetch_profile_init());
        dispatch(ACTIONS.fetch_videos_init());
    }, []);

  return (
      <AppContext.Provider value={[ state, dispatch ]}>
          {children}
      </AppContext.Provider>
  );
};

