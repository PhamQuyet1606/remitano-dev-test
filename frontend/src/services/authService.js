import customAxios from './custom-axios';

export const doAuth = (email, password) => {
    const userData = {
        email: email,
        password: password
    };
    return customAxios.post('/auth', userData);
};

export const fetchProfile = () => {
    return customAxios.get('/profile');
};
