// Action Types
export const FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST';
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_FAILURE = 'FETCH_PERMISSIONS_FAILURE';
export const ADD_PERMISSION_REQUEST = 'ADD_PERMISSION_REQUEST';
export const ADD_PERMISSION_SUCCESS = 'ADD_PERMISSION_SUCCESS';
export const ADD_PERMISSION_FAILURE = 'ADD_PERMISSION_FAILURE';

export const UPDATE_PERMISSION_REQUEST = 'UPDATE_PERMISSION_REQUEST';
export const UPDATE_PERMISSION_SUCCESS = 'UPDATE_PERMISSION_SUCCESS';
export const UPDATE_PERMISSION_FAILURE = 'UPDATE_PERMISSION_FAILURE';
export const REMOVE_PERMISSION_REQUEST = 'REMOVE_PERMISSION_REQUEST';
export const REMOVE_PERMISSION_SUCCESS = 'REMOVE_PERMISSION_SUCCESS';
export const REMOVE_PERMISSION_FAILURE = 'REMOVE_PERMISSION_FAILURE';





export interface UpdatePermissionRequestAction {
    type: typeof UPDATE_PERMISSION_REQUEST;
    payload: Permission;
}

export interface UpdatePermissionSuccessAction {
    type: typeof UPDATE_PERMISSION_SUCCESS;
    payload: Permission;
}

export interface UpdatePermissionFailureAction {
    type: typeof UPDATE_PERMISSION_FAILURE;
    payload: string;
}

export interface RemovePermissionRequestAction {
    type: typeof REMOVE_PERMISSION_REQUEST;
    payload: string; // _id of the permission to remove
}

export interface RemovePermissionSuccessAction {
    type: typeof REMOVE_PERMISSION_SUCCESS;
    payload: string; // _id of the removed permission
}

export interface RemovePermissionFailureAction {
    type: typeof REMOVE_PERMISSION_FAILURE;
    payload: string;
}



// Interfaces
export interface Permission {
    _id: string;
    action: string;
    url: string;
    role: string;
    topic?: string;
    verb: string;
    created_at?: string;
    updated_at?: string;
}

interface FetchPermissionsRequestAction {
    type: typeof FETCH_PERMISSIONS_REQUEST;
}

interface FetchPermissionsSuccessAction {
    type: typeof FETCH_PERMISSIONS_SUCCESS;
    payload: Permission[];
}

interface FetchPermissionsFailureAction {
    type: typeof FETCH_PERMISSIONS_FAILURE;
    payload: string;
}

interface AddPermissionRequestAction {
    type: typeof ADD_PERMISSION_REQUEST;
    payload: Permission;
}

interface AddPermissionSuccessAction {
    type: typeof ADD_PERMISSION_SUCCESS;
    payload: Permission;
}

interface AddPermissionFailureAction {
    type: typeof ADD_PERMISSION_FAILURE;
    payload: string;
}

export type DevOpsActionTypes =
    | FetchPermissionsRequestAction
    | FetchPermissionsSuccessAction
    | FetchPermissionsFailureAction
    | AddPermissionRequestAction
    | AddPermissionSuccessAction
    | AddPermissionFailureAction
    | UpdatePermissionRequestAction
    | UpdatePermissionSuccessAction
    | UpdatePermissionFailureAction
    | RemovePermissionRequestAction
    | RemovePermissionSuccessAction
    | RemovePermissionFailureAction;

// Action Creators
// Action Creators
export const fetchPermissionsRequest = (): FetchPermissionsRequestAction => ({
    type: FETCH_PERMISSIONS_REQUEST,
});

export const fetchPermissionsSuccess = (permissions: Permission[]): FetchPermissionsSuccessAction => ({
    type: FETCH_PERMISSIONS_SUCCESS,
    payload: permissions,
});

export const fetchPermissionsFailure = (error: string): FetchPermissionsFailureAction => ({
    type: FETCH_PERMISSIONS_FAILURE,
    payload: error,
});

export const addPermissionRequest = (permission: Permission): AddPermissionRequestAction => ({
    type: ADD_PERMISSION_REQUEST,
    payload: permission,
});

export const addPermissionSuccess = (permission: Permission): AddPermissionSuccessAction => ({
    type: ADD_PERMISSION_SUCCESS,
    payload: permission,
});

export const addPermissionFailure = (error: string): AddPermissionFailureAction => ({
    type: ADD_PERMISSION_FAILURE,
    payload: error,
});

export const updatePermissionRequest = (permission: Permission): UpdatePermissionRequestAction => ({
    type: UPDATE_PERMISSION_REQUEST,
    payload: permission,
});

export const updatePermissionSuccess = (permission: Permission): UpdatePermissionSuccessAction => ({
    type: UPDATE_PERMISSION_SUCCESS,
    payload: permission,
});

export const updatePermissionFailure = (error: string): UpdatePermissionFailureAction => ({
    type: UPDATE_PERMISSION_FAILURE,
    payload: error,
});

export const removePermissionRequest = (id: string): RemovePermissionRequestAction => ({
    type: REMOVE_PERMISSION_REQUEST,
    payload: id,
});

export const removePermissionSuccess = (id: string): RemovePermissionSuccessAction => ({
    type: REMOVE_PERMISSION_SUCCESS,
    payload: id,
});

export const removePermissionFailure = (error: string): RemovePermissionFailureAction => ({
    type: REMOVE_PERMISSION_FAILURE,
    payload: error,
});
