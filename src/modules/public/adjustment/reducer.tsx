 
import { AdminAdjustments_adminAdjustments_result } from 'queries/AdminAdjustments';
import { ADD_ADJUSTMENT, FETCH_ADJUSTMENTS_FAILURE, FETCH_ADJUSTMENTS_REQUEST, FETCH_ADJUSTMENTS_SUCCESS } from './constants';
  
export interface AdjustmentState {
  loading : boolean;
  data: AdminAdjustments_adminAdjustments_result[];
  error: string | null;
}

const initialState: AdjustmentState = {
  loading: false,
  data: [],
  error: null,
};

export const adjustmentReducer = (state = initialState, action: any): AdjustmentState => {
  switch (action.type) {
    case FETCH_ADJUSTMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ADJUSTMENT :
      // Check if the adjustment already exists
       console.log(state.data.find((old) => old.id === action.payload.id ))
      // If it does not exist, add the new adjustment to the data array
      return { ...state, loading: false, data:  action.payload  };
      
    case FETCH_ADJUSTMENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_ADJUSTMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
  
  
  