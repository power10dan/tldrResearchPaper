export const userLoginST = {
	st_is_logged_in: false,
	st_error_msg: "",
	st_success_msg: "",
	st_is_open_dialog: false
};

export const createProfile = {
    st_is_registered: false,
    st_prf_err_msg: "",
    st_prf_success_msg: "",
	  st_is_open_dialog: false,
    st_dismiss_prf_dialog: true
};

export const userProfile = {
	userName: "",
	userEmail: "",
	token: "",
};

export const generalState = {
    files: [],
    favorites: [ ],
	upvotedSummaries: [ ],
	errorUploadFile: "",
	errorRetrieveFile: "",
	getFile: false,
	opDialog: false,
	successMess: ""
};

export const isLoadingST = {
	st_is_load: false
};

