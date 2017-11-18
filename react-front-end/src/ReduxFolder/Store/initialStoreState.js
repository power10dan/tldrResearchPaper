export const userLogin = {
	isLoggedIn: false,
	errorMessage: "",
	successMess: "",
	isOpenDialog: false,
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

export const isLoading = {
	isLoad: false,
};

