export function SET_USERS(state, users) {
    state.users = users;
}

export function AUTH_REQUEST(state) {
    state.status = 'loading'
}

export function AUTH_SUCCESS(state, token, user) {
    state.status = 'success'
    state.token = token
    state.user = user
}

export function AUTH_ERROR(state) {
    state.status = 'error'
}

export function LOGOUT(state) {
    state.status = ''
    state.token = ''
}