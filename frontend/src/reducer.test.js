import usersReducer from "./store/reducers/usersReducer";
import React from "react";
import {
    GET_USERS_SUCCESS,
    getUsersFailure,
    getUsersRequest,
    getUsersSuccess,
    loginUserFailure,
    loginUserRequest,
    loginUserSuccess,
    oneGetUserSuccess,
    registerUserFailure,
    registerUserRequest,
    registerUserSuccess
} from "./store/actions/actionsUsers";


describe('userReducer', () => {

    it('should return default state ', () => {
        const state = {
            registerLoading: false,
            registerError: null,
            user: null,
            loginLoading: false,
            loginError: null,
            users: [],
            error: null,
            oneUser: {}
        };


        const newState = usersReducer(undefined, {});
        expect(newState).toEqual(state)
    });

    it('should return new state if receiving type ', () => {

        let data = {
            isRemoved: false,
            role: "admin",
            _id: "5f0304c762cada0950db9271",
            username: "123",
            token: "sO-e9A_0kCdLd63qpJDHy",
            displayName: "vasya",
            phone: "123",
            date: "2020-07-06T11:02:31.110Z"
        };

    let action = {
        type: GET_USERS_SUCCESS,
        data
    };
        const newState = usersReducer(undefined, action);
    expect(newState.users).toEqual(data)
})
    ;

    it('user register request should return registerLoading ', () => {

        const action = registerUserRequest();
        const newState = usersReducer(undefined, action);
        expect(newState.registerLoading).toBe(true)
    });

    it('should return new state registerLoading and registerError ', () => {

        const action = registerUserSuccess();
        const newState = usersReducer(undefined, action);
        expect(newState.registerLoading).toBe(false);
        expect(newState.registerError).toBe(null);
    });

    it('register user failure should return an error ', () => {

        let error = {"error": "Access denied"};

        const action = registerUserFailure(error);
        const newState = usersReducer(undefined, action);
        expect(newState.registerError).toEqual(error);
    });

    it('login user request should return loginLoading  ', () => {
        const action = loginUserRequest();
        const newState = usersReducer(undefined, action);
        expect(newState.loginLoading).toBe(true)
    });

    it('login user success should return  registerLoading , registerError and user ', () => {
        let user = {
            isRemoved: false,
            role: "admin",
            _id: "5f0304c762cada0950db9271",
            username: "123",
            token: "sO-e9A_0kCdLd63qpJDHy",
            displayName: "vasya",
            phone: "123",
            date: "2020-07-06T11:02:31.110Z"
        };

        const action = loginUserSuccess(user);
        const newState = usersReducer(undefined, action);
        expect(newState.loginLoading).toBe(false);
        expect(newState.loginError).toBe(null);
        expect(newState.user).toEqual(user);
    });

    it('login user failure should return an error ', () => {

        let error = {"error": "Access denied"};

        const action = loginUserFailure(error);
        const newState = usersReducer(undefined, action);
        expect(newState.loginError).toEqual(error);
    });

    it('get user request should return loginLoading = true  ', () => {

        const action = getUsersRequest();
        const newState = usersReducer(undefined, action);
        expect(newState.loginLoading).toBe(true)
    });

    it('get user success should return  registerLoading = false , registerError = null and user ', () => {

        let users = [{
            isRemoved: false,
            role: "admin",
            _id: "5f0304c762cada0950db9271",
            username: "123",
            token: "sO-e9A_0kCdLd63qpJDHy",
            displayName: "vasya",
            phone: "123",
            date: "2020-07-06T11:02:31.110Z"
        },{
            isRemoved: false,
            role: "user",
            _id: "5f0304c76ffka0950db9272",
            username: "gosha",
            token: "g3-e9A_04CdLd63qpJGJy",
            displayName: "Green",
            phone: "0555 55 45 76",
            date: "2020-06-06T11:02:31.110Z"
        }];

        const action = getUsersSuccess(users);
        const newState = usersReducer(undefined, action);
        expect(newState.loginLoading).toBe(false);
        expect(newState.loginError).toBe(null);
        expect(newState.users).toEqual(users);
    });

    it('get user failure should return an error ', () => {

        let error = {"error": "not fount"};

        const action = getUsersFailure(error);
        const newState = usersReducer(undefined, action);
        expect(newState.error).toEqual(error);
    });

    it('get one user success should return  loginLoading = false  and One user ', () => {

        let user = {
            isRemoved: false,
            role: "admin",
            _id: "5f0304c762cada0950db9271",
            username: "123",
            token: "sO-e9A_0kCdLd63qpJDHy",
            displayName: "vasya",
            phone: "123",
            date: "2020-07-06T11:02:31.110Z"
        };
        const action = oneGetUserSuccess(user);
        const newState = usersReducer(null, action);
        expect(newState.loginLoading).toBe(false);
        expect(newState.oneUser).toEqual(user);
    });

});

