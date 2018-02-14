import * as ReducerComps from '../Redux/Reducers/AppReducers.js';
import * as types from '../Redux/Actions/ActionConstants.js';
import { CachedPaperActionCreator } from '../Redux/Actions/ActionCreators.js';

describe("Tests the action creator function", ()=>{
	it('tests whether action creator returns a valid action given the correct payload', ()=>{
		let expectedReturn = { 
							type: types.CACHED_PAPERS, 
							data: {
									forename: "Sir Francis", 
									surname: "The Hun",
									orgName: "Captain Spiral", 
									title: "My Best paper On Spiralling out of control",
									email: "sir.francis@gmail.com",
									id: 676,
									pgid: 464			 
								},
						  }
		let payLoad =   {
							forename: "Sir Francis", 
							surname: "The Hun",
							orgName: "Captain Spiral", 
							title: "My Best paper On Spiralling out of control",
							email: "sir.francis@gmail.com",
							id: 676,
							pgid: 464			 
					    };

		let returnedAction = CachedPaperActionCreator(types.CACHED_PAPERS, payLoad );
		expect(returnedAction).toEqual(expectedReturn);
	});

	it('tests if the action creator returns false given the incorrect payload', ()=>{
		let expectedReturn = false;
		let incorrectPayLoad = {
									forename: "Sir Badass",
									orgName: "bad guy.org "
							   };

		expect(CachedPaperActionCreator(types.CACHED_PAPERS, incorrectPayLoad)).toEqual(false);
	});
});






