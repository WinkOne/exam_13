import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {getRecipes} from "../../store/actions/recipeAction";
import Grid from "@material-ui/core/Grid";

const Placeses = () => {
    const recipes = useSelector(state => state.recipe.recipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipes())
    }, []);
    return (
        <Grid container item spacing={2}>
            {recipes && recipes.map(r => (
                <Grid style={{margin:'10px'}}   key={r._id} item>
                <RecipeCard
                    image={r.image}
                    overall={r.overall}
                    name={r.name}
                    id={r._id}
                />
                </Grid>
            ))}

        </Grid>
    );
};

export default Placeses;