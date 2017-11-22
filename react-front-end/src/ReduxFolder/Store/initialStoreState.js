export const userLoginST = {
	st_is_logged_in: false,
	st_error_msg: "",
	st_success_msg: "",
	st_is_open_dialog: false
};

export const createProfileST = {
    st_is_registered: false,
    st_prf_err_msg: "",
    st_prf_success_msg: "",
	  st_is_open_dialog: false,
    st_dismiss_prf_dialog: true
};

export const userProfileST = {
	  st_username: "",
	  st_user_email: "",
	  st_token: ""
};

export const generalState = {
    st_files: [],
    st_favorites: [ ],
	  st_upvoted_sums: [ ],
    st_err_upload: "",
    st_dl_file_names: new Set(),
    st_err_file: "",
    st_get_file: false,
    st_is_open_dialog: false,
    st_success_msg: ""
};

export const isLoadingST = {
	  st_is_load: false
};

