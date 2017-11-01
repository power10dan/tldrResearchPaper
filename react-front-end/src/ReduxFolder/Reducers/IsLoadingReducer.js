import LOADING from '../Constants/Actiontypess';
import initState from "./StateTree.js"

// a reducer to update the loading status
function isLoadingReducer(state = {}, action){
    switch (action.type){
        case LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading, 
            });
    }
}

export isLoadingReducer;