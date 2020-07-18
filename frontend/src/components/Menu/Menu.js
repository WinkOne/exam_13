import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddCircleIcon from '@material-ui/icons/AddCircle';


export default function SwipeableTemporaryDrawer(props) {
    return (
        <div>
            <React.Fragment>
                <SwipeableDrawer
                    id={props.id}
                    anchor={'left'}
                    open={props.open}
                    onClose={() => props.close(false)}
                    onOpen={() => props.menuHandler(true)}

                >
                    <NavLink onClick={()=> props.close(false)} to="/addRecipe" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AssignmentIcon/>
                                <ListItemText primary="Add recipe"/>
                            </ListItem>
                        </List>
                    </NavLink>
                    <NavLink onClick={()=> props.close(false)} to="/" style={{fontSize:'24px',textDecoration:'none',width:'160px', color:'#888'}} >
                        <List>
                            <ListItem button >
                                <AddCircleIcon/>
                                <ListItemText primary="Recipes"/>
                            </ListItem>
                        </List>
                    </NavLink>
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}