import * as types from '../Actions/ActionConstants.js';
import * as InitialStates from '../store/InitialStateTree.js';
import { combineReducers } from 'redux';

const ReducerPapers = (state=InitialStates.CachedPapers, actions) =>{
	switch(actions.type){
		case types.CACHED_PAPERS:
			return {...state, papersQueried: [...state.papersQueried, actions.data]};

		case types.PAPERS_SELECTED:
			return {...state, papersSelected: [...state.papersSelected, actions.data]};

		case types.CACHED_PAPER_ORIGINAL:
			return {...state, cachedPaperOriginal: {...state.cachedPaperOriginal, [actions.data.title]:actions.data}};

		case types.CACHED_PAPER_CITED:
			return {...state, cachedPaperCited: {...state.cachedPaperCited, [actions.data.title]:actions.data}};

		case types.CACHED_PAPER_ORIGINAL_CHILDREN:
			return {...state, cachedPaperOriginalChildren: {...state.cachedPaperOriginalChildren, [actions.data.title]:actions.data}};
		default:
			return state;
	}
}

const ReducerAppState = (state = InitialStates.AppState, actions) => {
	switch(actions.type){
		case types.CURR_PAGE:
			return {...state, CurrPage: actions.dataPayload};
		case types.IS_GET_TOKEN:
			return {...state, isGetToken: actions.dataPayload};
		case types.IS_LOGIN:
			return {...state, isLogin: actions.dataPayload};
		case types.TOKEN_UPDATE:
			return {...state, token: actions.dataPayload};
		case types.TYPE_OF_RESEARCHER:
			return {...state, typeOfResearcher: actions.dataPayload};
		case types.PREF_CONFERENCE:
			return {...state, prefConference: actions.dataPayload};
		case types.FILE_TO_UPLOAD:
			return {...state, selectedFile: actions.dataPayload}
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