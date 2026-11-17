export const timeConnectionInitialState = {
  openDialog: false,
  enabled: false,
  timeInit: 0,
  msDuration: 0,
};

const timerConnection = (state = timeConnectionInitialState, { type, payload }) => {
  switch (type) {
    case 'OPEN_DIALOG_TIMER':
      return { ...state, openDialog: true };
    case 'CLOSE_DIALOG_TIMER':
      return { ...state, openDialog: false };
    case 'START_TIMER_DISCONNECT':
      return {
        ...state,
        openDialog: false,
        enabled: true,
        timeInit: new Date().getTime(),
        msDuration: payload.msDuration,
      };
    case 'STOP_TIMER_DISCONNECT':
      return { ...timeConnectionInitialState };
    case 'LOGOUT_SUCCESS':
      return { ...timeConnectionInitialState };
    default:
      return state;
  }
};

export default timerConnection;