import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILURE,
    ADD_PERMISSION_REQUEST,
    ADD_PERMISSION_SUCCESS,
    ADD_PERMISSION_FAILURE,
    UPDATE_PERMISSION_REQUEST,
    UPDATE_PERMISSION_SUCCESS,
    UPDATE_PERMISSION_FAILURE,
    REMOVE_PERMISSION_REQUEST,
    REMOVE_PERMISSION_SUCCESS,
    REMOVE_PERMISSION_FAILURE,
    DevOpsActionTypes,
} from './actions';

export interface DevOpsState {
    permissions: {
        _id: string;
        action: string;
        url: string;
        role: string;
        topic?: string;
        verb: string;
        created_at?: string;
        updated_at?: string;
    }[];
    loading: boolean;
    error: string | null;
}

const initialState: DevOpsState = {
    permissions: [],
    loading: false,
    error: null,
};

export const devopsReducer = (state = initialState, action: DevOpsActionTypes): DevOpsState => {
    switch (action.type) {
        case FETCH_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_PERMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                permissions: action.payload,
            };

        case FETCH_PERMISSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case ADD_PERMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case ADD_PERMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                permissions: [...state.permissions, action.payload],
            };

        case ADD_PERMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error : action.payload
            };

        case UPDATE_PERMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

            case UPDATE_PERMISSION_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    permissions: state.permissions.map(permission =>
                        permission._id === action.payload._id
                            ? { ...permission, ...action.payload }
                            : permission
                    ),
                };
            

        case UPDATE_PERMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case REMOVE_PERMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case REMOVE_PERMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                permissions: state.permissions.filter(permission => permission._id !== action.payload),
            };

        case REMOVE_PERMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
