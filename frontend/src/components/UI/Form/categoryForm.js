import React from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "./FormElement";
import Button from "@material-ui/core/Button";

const CategoryForm = (props) => {

    return  (
        <Grid container justify="center" style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
            {props.state && <Box component="div" boxShadow={10} style={{background:'#fff'}} p={5}>

                <Box style={{textAlign: "center", textTransform: 'uppercase'}} pt={2} pb={2}>
                    <Typography variant="h4">{props.name}</Typography>
                </Box>

                <form onSubmit={props.submitFormHandler}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <FormElement
                                propertyName="title"
                                title="Title"
                                value={props.state.title ? props.state.title : ''}
                                onChange={props.inputChangeHandler}
                                placeholder="Enter title"

                            />
                        </Grid>
                        <Grid item xs>
                            <FormElement
                                propertyName="parent_id"
                                title="Subcategories"
                                type="select"
                                value={props.state.parent_id ?props.state.parent_id : '' }
                                onChange={props.inputChangeHandler}
                                placeholder="Subcategories"
                                options={props.category}
                            />
                        </Grid>
                        <Grid container item direction="row" spacing={2}>
                        <Grid item >
                            <Button type="submit" color="primary" variant="contained">
                                {props.name}
                            </Button>
                        </Grid>
                        {props.delete && <Grid item >
                            <Button onClick={props.remove} color="secondary" variant="contained">
                                {props.delete}
                            </Button>
                        </Grid>}
                        </Grid>
                    </Grid>
                </form>

            </Box>}
        </Grid>
    );
};

export default CategoryForm;