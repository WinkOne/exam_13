import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";

const AddUser = (props) => {
    return (
        <>

            <Grid container justify="center" style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
                <Box component="div" boxShadow={10} p={5} style={{background:'#fff'}} >

                    <Box style={{textAlign:"center",textTransform:'uppercase'}} pt={2} pb={2}>
                        <Typography variant="h4">{props.formName}</Typography>
                    </Box>

                    <form onSubmit={props.submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName="username"
                                    required
                                    title="User name"
                                    value={props?.state?.username ?? '' }
                                    onChange={props.inputChangeHandler}
                                    error={props.getFieldError('username')}
                                    placeholder="Enter username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="password"
                                    title="Password"
                                    type="password"
                                    value={props?.state?.password ?? '' }
                                    onChange={props.inputChangeHandler}
                                    error={props.getFieldError('password')}
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="displayName"
                                    title="Display name"
                                    type="text"
                                    value={props?.state?.displayName ?? ''}
                                    onChange={props.inputChangeHandler}
                                    error={props.getFieldError('displayName')}
                                    placeholder="Enter Display name"
                                    autoComplete="Display name"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="role"
                                    title="Role"
                                    type="select"
                                    value={props?.state?.role ?? ''}
                                    onChange={props.inputChangeHandler}
                                    error={props.getFieldError('displayName')}
                                    placeholder="Role"
                                    options={[{role:'admin',_id:'admin'},{role:'user',_id:'user'}]}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="avatar"
                                    title="Avatar"
                                    type="file"
                                    onChange={props.fileChangeHandler}
                                    error={props.getFieldError('avatar')}

                                />
                            </Grid>
                            <Grid container item direction="row" spacing={2}>
                            <Grid item >
                                <Button  type="submit" color="primary" variant="contained">
                                    {props.formName}
                                </Button>
                            </Grid>
                           { props.delete && <Grid item >
                                <Button onClick={props.remove}   color="secondary" variant="contained">
                                    {props.delete}
                                </Button>
                            </Grid>}
                        </Grid>
                        </Grid>
                    </form>

                </Box>
            </Grid>
        </>
    );
};

export default AddUser;