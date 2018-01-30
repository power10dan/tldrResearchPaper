import * as types from '../Actions/ActionConstants.js';
import * as InitialStates from '../store/InitialStateTree.js';
import { combineReducers } from 'redux';

const ReducerPapers = (state=InitialStates.CachedPapers, actions) =>{
	switch(actions.type){
		case types.CACHED_PAPERS:
			return [ ...state.papersQueried, actions.data];
		case types.PAPERS_SELECTED:
			return [...state.papersSelected, actions.data];

		case types.CACHED_PAPER_AUTHORS:
			return [...state.cachedPaperAuthors, actions.data]
		default:
			return state;
	}
}

const ReducerAppState = (state = InitialStates.AppState, actions) => {
	switch(actions.type){
		case types.CURR_PAGE:
			return [...state, {CurrPage: actions.dataPayload}];
		case types.IS_GET_TOKEN:
			return [...state, {isGetToken: actions.dataPayload}];
		case types.IS_LOGIN:
			return [...state, {isLogin: actions.dataPayload}];
		case types.TOKEN_UPDATE:
			return [...state, {token: actions.dataPayload}];
		default:
			return state;
	}
}

const ReducerTutorialSettings = (state= InitialStates.TutorialSettings, actions)=>{
	switch(actions.type){
		case types.CONFERENCE_FILTER:
			return {...state, conferenceFilters: [...state.conferenceFilters, actions.payLoad]};
		case types.RESEARCHER_FILTER:
			return {...state, researcherFilters: [...state.researcherFilters, actions.payLoad]};
		default:
			return state;
	}
}

const tldrApp = combineReducers({
	ReducerPapers,
	ReducerAppState,
	ReducerTutorialSettings
});

export default tldrApp;