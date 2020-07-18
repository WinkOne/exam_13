import React, {useState} from 'react';
import {registerUser} from "../../../store/actions/actionsUsers";
import AddUser from "../../../containers/AddUser/AddUser";
import {useDispatch, useSelector} from "react-redux";

const UserAdd = () => {
    const dispatch = useDispatch();
    const error = useSelector((state=> state.users.error));
    const loading = useSelector((state=> state.users.loading));
   const [state,setState] = useState( {
        username: '',
        password: '',
        displayName:'',
        avatar:''
    });

  const  inputChangeHandler = event => {
        setState({...state,
            [event.target.name]: event.target.value
        })
    };

   const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key=>{
            formData.append(key,state[key])
        });
        dispatch(registerUser(formData));
    };
  const  fileChangeHandler = (e)=>{
        setState({...state,[e.target.name]: e.target.files[0]})
    };

   const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };
    return (
        <div>
          <AddUser
              getFieldError={getFieldError}
              fileChangeHandler={fileChangeHandler}
              submitFormHandler={submitFormHandler}
              inputChangeHandler={inputChangeHandler}
              state={state}
              formName={'Create user'}
          />
        </div>
    );
};

export default UserAdd;