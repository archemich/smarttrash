export const state = () => ({
    LoggedIn: false,
    User: undefined
})


export const getters = {
    LoggedIn: state=> state.LoggedIn,
    User: state=> state.User
}


export const mutations = {
    setLoggedIn(state, bool) {
        state.LoggedIn = bool;
    },

    setUser(state, user) {
        state.User = user;
    }
}


export const actions = {
    logout({commit}) {
        this.$cookie.remove('token');
        commit('setLoggedIn', false);
        commit('setUser', undefined)
    },

    login({commit}, {token, user}) {
        commit('setLoggedIn', true);
        commit('setUser', user);
        this.$cookie.set('token', "Bearer " + token, {path: '/', maxAge: 3600});
    }
}