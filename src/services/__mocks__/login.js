const login = ( username, password ) => {
    return Promise.resolve({ token:'mocktoken01' + password, username: username, name: 'Mocki Mockington' })
}

export default { login }
