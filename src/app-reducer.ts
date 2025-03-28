import type { AppState, ReducerActions } from "./types/app-types.d";

const persistState = (state: AppState) => {
  // this allows us to persist certain state values to local storage
  // or other opperations that we might want to do when the state changes
  // putLocalData('app-prototype', state);
  return state;
}

export const appReducer = (
  lastState: AppState,
  action: ReducerActions
): AppState => {
  const { payload, type } = action;

  // console.info('==> appReducer:', type, payload);

  switch (type) {
    case 'SetDojoData':
      const { dojoData } = payload;
      return persistState({
        ...lastState,
        dojoData
      });
    case 'SetStudentBehaviors':
      const { studentBehaviors } = payload;
      return persistState({
        ...lastState,
        studentBehaviors
      });
    case 'SetByStudent':
      const { awardsByStudents } = payload;
      return persistState({
        ...lastState,
        ...{ awardsByStudents }
      });    
    case 'SetByClassroom':
      const { awardsByClassroom } = payload;
      return persistState({
        ...lastState,
        ...{ awardsByClassroom }
      });

    case 'SetAwards':
      const { awardsData } = payload;
      return persistState({
        ...lastState,
        ...{ awardsData }
      });
    case 'Loaded':
      const { isLoaded } = payload;
      return persistState({
        ...lastState,
        ...{ isLoaded }
      });
    default: {
      // we should warn if we get here as we don't have a handler for the payload type
      console.warn('app-reducer: type not handled', type);
      console.warn('app-reducer: payload', payload);
      return persistState({ ...lastState });
    }
  }
}
