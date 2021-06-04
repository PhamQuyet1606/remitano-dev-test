const express = require('express');
const { validateLoginData } = require('../utils/validators');
const { checkAuth, checkUserExistByEmail, doLogin, doSignUp, doFetchProfile } = require('../services/auth');

const doAuth = async (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    };

    const {valid, errors} = validateLoginData(user);
    if (!valid) {
        return response.status(400).json(errors);
    }

    const existing = await checkUserExistByEmail(user.email);
    let authResult = await (existing ? doLogin(user.email, user.password) : doSignUp(user.email, user.password));
    if (!authResult.isError) {
        return response.status(200).json({ token: authResult.token });
    }

    return (authResult.err.code === 'auth/invalid-credential')
         ? response.status(403).json({general: 'wrong credentials, please try again'})
         : response.status(500).json({ error: authResult.err });
};
const doAuthCheck = async (request, response, next) => {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.send({ message: "No token provided" }).status(401);
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        response.send({ message: "Invalid token" }).status(401);
    }

    const token = headerToken.split(' ')[1];
    const authCheckingResult = await checkAuth(token);

    if (authCheckingResult.isError) {
        return response.status(403).json(authCheckingResult.err);
    }
    request['user'] = {
        email: authCheckingResult.user.email,
        uid: authCheckingResult.user.uid
    };

    return next();
};
const fetchProfile = (request, response) => {
    doFetchProfile(request.user.uid)
        .then((userRecord) => {
            if(userRecord) {
                return response.status(200).json(userRecord);
            }
            return response.status(204).json({});
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ error: error });
        });
};

module.exports = {doAuth, doAuthCheck, fetchProfile};
