import React, {useState} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {postPlaces} from "../../store/actions/recipeAction";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";



const AddPlaces = () => {

    const [check, setCheck] = React.useState({
        checkedA: false,
    });
    const handleCheckedChange = (event) => {
        setCheck({ ...check, [event.target.name]: event.target.checked });
    };
    const dispatch = useDispatch();
    const error = useSelector(state => state.recipe.error);
    const [state, setState] = useState({
        name: '',
        description: '',
        image: null
    });

    const inputChangeHandler = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };
    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key])
        });
        formData.append('checked', check.checkedA);
        dispatch(postPlaces(formData))
    };

    const fileChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
    };

    return (

        <Grid container justify="center" style={{margin: '0 auto', marginTop: '5%'}} item xs={12} lg={8} sm={7} ml={8}>
            <Box component="div" boxShadow={10} style={{background: '#fff'}} p={5}>
                <Box style={{textAlign: "center", textTransform: 'uppercase'}} pt={2} pb={2}>
                    <Typography variant="h4">Add Places</Typography>
                </Box>
                <form onSubmit={submitFormHandler}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <FormElement
                                propertyName="name"
                                title={"Name"}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <FormElement
                                propertyName="description"
                                title={"Description"}
                                type='textarea'
                                rows={4}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <FormElement
                                id={'browse'}
                                propertyName="image"
                                title={"Image"}
                                type="file"
                                onChange={fileChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    {error && <Grid item>
                        <Alert severity='error'>{error || error.message}</Alert>
                    </Grid>}
                    <Grid item xs>
                        <FormControlLabel
                            control={<Checkbox checked={check.checkedA} onChange={handleCheckedChange} name="checkedA" />}
                            label="Я согласен"
                        />
                        <p>
                            Вы согласны с условием добовление еэтого заведение на наш замечательный сайт который сделать очень хорошо ежже, нашт супер мега програмисты постарались его сделать красавчики!!!
                        </p>
                        <Button disabled={!check.checkedA} style={{marginTop: '15px'}} type="submit" color="primary" variant="contained">
                            Add
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Grid>
    );

};

export default AddPlaces;