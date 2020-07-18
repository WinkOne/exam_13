import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "./FormElement";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const FormArticle = (props) => {
    return (

        <Grid container justify="center" style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
            {props.value &&  <Box component="div" boxShadow={10} style={{background:'#fff'}} p={5} >

                    <Box style={{textAlign:"center",textTransform:'uppercase'}} pt={2} pb={2}>
                        <Typography variant="h4">{props.name}</Typography>
                    </Box>

                    <form onSubmit={props.submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName="title"
                                    title="Title"
                                    required
                                    type="text"
                                    value={props.value.title ? props.value.title : ''}
                                    onChange={props.inputChangeHandler}
                                    placeholder="Title"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="description"
                                    title="Description"
                                    required
                                    type="text"
                                    value={props.value.description ? props.value.description:''}
                                    onChange={props.inputChangeHandler}
                                    placeholder="Description"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="category"
                                    title="Category"
                                    required
                                    type="select"
                                    value={props.value.category ? props.value.category : '' }
                                    onChange={props.inputChangeHandler}
                                    placeholder="Category"
                                    options={props.options}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="image"
                                    title="Image"
                                    type="file"
                                    onChange={props.fileChangeHandler}
                                />
                            </Grid>
                            {props.error && <Grid item>
                                <Alert severity='error'>{props.error.errmsg || props.error.message}</Alert>
                            </Grid>}
                            <Grid item xs>
                                <Button  type="submit" color="primary" variant="contained">
                                    {props.name}
                                </Button>
                            </Grid>
                            {props.delete &&<Grid item xs>
                                <Button  onClick={props.remove} color="secondary" variant="contained">
                                    {props.delete}
                                </Button>
                            </Grid>}
                        </Grid>
                    </form>
                </Box>}
            </Grid>
          );
};

export default FormArticle;