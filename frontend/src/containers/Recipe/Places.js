import React, {useEffect, useState} from 'react';
import {getPlaces, putPlaces} from "../../store/actions/recipeAction";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {apiURL} from "../../constants";
import Box from "@material-ui/core/Box";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {deleteComment, getComment, postComment} from "../../store/actions/actionComment";
import Rating from "@material-ui/lab/Rating";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Places = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipe.recipe);
    const comment = useSelector(state => state.comment.comments);
    const user = useSelector(state => state.users.user);
    const [state, setState] = useState({
        comment: '',
        easyToMake: '',
        quickToMake: '',
        taste: '',
    });

    const [image, setImage] = useState({
        image: null
    });

    useEffect(() => {
        dispatch(getPlaces(props.match.params.id));
        dispatch(getComment(props.match.params.id))
    }, [comment.length]);

    const inputChangeHandler = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    };
    const submitFormHandler = event => {
        event.preventDefault();
        dispatch(postComment({...state, recipe: props.match.params.id}));
    };

    const fileChangeHandler = (e) => {
        setImage({
            image: e.target.files[0]
        })
    };

    const removeChangeHandler = (id, recipeId) => {
        dispatch(deleteComment(id, recipeId));

    };
    const submitImageFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.image);
        dispatch(putPlaces(props.match.params.id, formData))
    };


    const options = [
        {title: '5.0', _id: '5.0'},
        {title: '4.0', _id: '4.0'},
        {title: '3.0', _id: '3.0'},
        {title: '2.0', _id: '2.0'},
        {title: '1.0', _id: '1.0'},
    ];

    return (
        <Grid direction="column" container item>
            <Grid style={{marginTop: '10px'}} container item>
                <Grid item xs>
                    <Typography variant={"h3"} component={"h3"}>{recipe.name}</Typography>
                    <Typography variant={"h6"} component={"span"}>{recipe.description}</Typography>
                </Grid>
                {recipe.image && <Grid style={{width: '280px', height: '90%', marginRight: '5px'}} item xs>
                    <img style={{width: '100%', borderRadius: '5px', border: '2px solid black'}} src={apiURL + '/' + recipe.image} alt={recipe.image}/>
                </Grid>}
            </Grid>

            <Card style={{marginBottom: '10px', marginTop: '10px'}}>
                <Grid direction="row" style={{display: 'flex', flexWrap: 'wrap'}} container item>
                    {recipe?.images?.map(image => (
                        <Box key={image} style={{width: '100px', height: '100px', margin: '10px'}} component={"div"}>
                            <img style={{width: '100%', height: '100%'}} src={apiURL + '/' + image} alt="image"/>
                        </Box>
                    ))}
                </Grid>
            </Card>

            <Grid container item>
                {recipe && <Box>
                    <Typography variant={"h4"} component={"h4"}>Average ratings</Typography>

                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>Overall: </Typography>
                        <Rating name="half-rating-read" value={recipe.overall ?? 0.5} precision={0.2} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(recipe.overall) ? recipe.overall : recipe.overall + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>EasyToMake: </Typography>
                        <Rating name="half-rating-read" value={recipe.easyToMake ?? 0.5} precision={0.1} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(recipe.easyToMake) ? recipe.easyToMake : recipe.easyToMake + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>QuickToMake: </Typography>
                        <Rating name="half-rating-read" value={recipe.quickToMake ?? 0.5} precision={0.1} readOnly/>
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(recipe.quickToMake) ? recipe.quickToMake : recipe.quickToMake + '.0'}
                        </Typography>
                    </Box>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>Taste: </Typography>
                        <Rating name="half-rating-read" value={recipe.taste ?? 0.5} precision={0.1} readOnly/>
                        <Typography
                            style={{marginLeft: '8px'}}
                            variant={"h6"}
                            component={"span"}>
                            {!Number.isSafeInteger(recipe.taste) ? recipe.taste : recipe.taste + '.0'}
                        </Typography>
                    </Box>
                </Box>}
            </Grid>
            <Card style={{padding: '25px',}}>
                <Grid style={{display: 'flex', justifyContent: 'space-around'}} container item>
                    <Grid style={{width: '48%'}} item>
                        <form style={{width: '100%'}} onSubmit={submitFormHandler}>
                            <Grid item xs>
                                <FormElement
                                    required
                                    propertyName={'comment'}
                                    title={'Comment'}
                                    onChange={inputChangeHandler}
                                    value={state.comment}
                                />
                            </Grid>
                            <Grid container item style={{margin: '10px 0'}}>
                                <Grid item xs>
                                    <FormElement
                                        required
                                        type="select"
                                        propertyName={'easyToMake'}
                                        title={'EasyToMake'}
                                        onChange={inputChangeHandler}
                                        value={state.easyToMake}
                                        options={options}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        required
                                        type="select"
                                        propertyName={'quickToMake'}
                                        title={'QuickToMake'}
                                        value={state.quickToMake}
                                        onChange={inputChangeHandler}
                                        options={options}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        required
                                        type="select"
                                        propertyName={'taste'}
                                        title={'Taste'}
                                        value={state.taste}
                                        onChange={inputChangeHandler}
                                        options={options}
                                    />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Button color="primary" variant="contained" type="submit">
                                    add comment
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid style={{width: '48%'}} item>
                        <form onSubmit={submitImageFormHandler}>
                            <Grid item>
                                <FormElement
                                    propertyName={'image'}
                                    title={'Image'}
                                    onChange={fileChangeHandler}
                                    type="file"
                                />
                            </Grid>
                            <Grid item style={{marginTop: '8px'}}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add photo
                                </Button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Card>
            <Box>
                <h1>Comments</h1>
            </Box>
            <Grid>
                <Card>
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        Пользователь может оставлять рейтинг только один раз!
                        Остальное добавленный рейтинга не будет учитываться.
                    </Alert>
                    {comment.map(comments => (
                        <Card key={comments._id} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {comments.date}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {comments.user.username}
                                </Typography>
                                <Box className={classes.pos} color="textSecondary">
                                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant={"h6"} component={"span"}>Quality of food: </Typography>
                                        <Rating name="half-rating-read" value={comments.easyToMake ?? 0.5}
                                                precision={0.1} readOnly/>
                                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                                            {!Number.isSafeInteger(comments.easyToMake) ? comments.easyToMake : comments.easyToMake + '.0'}
                                        </Typography>
                                    </Box>
                                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant={"h6"} component={"span"}>Services quality: </Typography>
                                        <Rating name="half-rating-read" value={comments.quickToMake ?? 0.5}
                                                precision={0.1} readOnly/>
                                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                                            {!Number.isSafeInteger(comments.quickToMake) ? comments.quickToMake : comments.quickToMake + '.0'}
                                        </Typography>
                                    </Box>
                                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant={"h6"} component={"span"}>Interior: </Typography>
                                        <Rating name="half-rating-read" value={comments.taste ?? 0.5} precision={0.1}
                                                readOnly/>
                                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                                            {!Number.isSafeInteger(comments.taste) ? comments.taste : comments.taste + '.0'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" component="p">
                                    {comments.comment}
                                </Typography>
                            </CardContent>
                            {user.role === 'admin' && (<CardActions>
                                <Button onClick={() => removeChangeHandler(comments._id, comments.recipe)} size="small">Delete</Button>
                            </CardActions>)}
                        </Card>
                    ))}
                </Card>
            </Grid>
        </Grid>
    );
};

export default Places;