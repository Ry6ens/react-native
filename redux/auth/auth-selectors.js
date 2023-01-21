export const getStateChange = ({ auth }) => auth.stateChange;
export const getUserId = ({ auth }) => auth?.user.uid;
export const getUserName = ({ auth }) => auth?.user.name;
export const getUserEmail = ({ auth }) => auth?.user.email;
