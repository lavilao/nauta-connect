export const userStorageInitial = {
  status: 'none', // "loaded" || "cleared" | "saved"
  username: '',
  password: '',
  lastUpdate: new Date().getTime(),
};

const userStorage = (state = userStorageInitial, { type, payload }) => {
  switch (type) {
    case 'LOAD_USER_STORE':
      return {
        ...state,
        status: 'loaded',
        username: payload.username,
        password: payload.password,
        lastUpdate: new Date().getTime(),
      };
    case 'SAVE_USER_STORE':
      return {
        ...state,
        status: 'saved',
        username: payload.username,
        // The decrypted password is never kept in the persisted state.
        password: '',
        lastUpdate: new Date().getTime(),
      };
    case 'CLEAR_USER_STORE':
      return { ...state, status: 'cleared', password: '', lastUpdate: new Date().getTime() };
    case 'REMOVE_USER_STORE':
      return { ...state, status: 'cleared', password: '', lastUpdate: new Date().getTime() };
    default:
      return state;
  }
};

export default userStorage;