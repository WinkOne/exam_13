import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {apiURL} from "../../constants";
import {NavLink} from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useDispatch, useSelector} from "react-redux";
import {deletePlaces} from "../../store/actions/recipeAction";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const removeChangeHandler = (id) => {
        dispatch(deletePlaces(id));

    };    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={apiURL + '/' + props.image}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Box component={'div'} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography variant={"h6"} component={"span"}>Overall: </Typography>
                        {props.overall &&
                        <Rating name="half-rating-read" value={+props.overall} precision={0.2} readOnly/>}
                        <Typography style={{marginLeft: '8px'}} variant={"h6"} component={"span"}>
                            {!Number.isSafeInteger(props.overall) ? props.overall : props.overall + '.0'}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5px 0 19px'}}>
                <NavLink style={{fontSize: '20px', color: 'black', textDecoration: 'none'}}
                         to={'/recipe/' + props.id}>{props.name}
                    <IconButton><VisibilityIcon/></IconButton></NavLink>
                {user.role === 'admin' && (
                    <Box>
                        <IconButton onClick={() => removeChangeHandler(props.id,)}><HighlightOffIcon/></IconButton>
                    </Box>
                )}
            </Box>
        </Card>

    );
}