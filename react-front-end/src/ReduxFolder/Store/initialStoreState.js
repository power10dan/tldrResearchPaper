export const userLoginST = {
	st_is_logged_in: false,
	st_error_msg: "",
	st_success_msg: "",
	st_is_open_dialog: false
};

export const createProfile = {
	isRegistered: false,
	errorMessageProfile:  "",
	successMessageProfile: "",
	isOpenDialog: false,
	dismissProfileDialog: true
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

