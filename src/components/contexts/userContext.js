import { createContext } from 'react'

const defaultState = {
    isAdmin: '',
    userId: '',
    token: '',
    isLoggedIn: false,
    updateUser(){}
};

const { Consumer: UserConsumer, Provider: UserProvider } = createContext(defaultState);

export {
    UserConsumer,
    UserProvider,
    defaultState as defaultUserState
}