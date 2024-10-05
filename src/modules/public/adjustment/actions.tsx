 
import { ADD_ADJUSTMENT, FETCH_ADJUSTMENTS_REQUEST, FIND_ONE_ADJUSTMENT, REMOVE_ADJUSTMENT, UPDATE_ADJUSTMENT, UPLOAD_ADJUSTMENTS } from './constants';

import { AdminAdjustments_adminAdjustments_result } from '../../../queries/AdminAdjustments';

 
export const addAdjustment = (adjustment: AdminAdjustments_adminAdjustments_result ) => ({
  type: ADD_ADJUSTMENT,
  payload: adjustment,
});

export const findOneAdjustment = (id: string) => ({
  type: FIND_ONE_ADJUSTMENT,
  payload: id,
});

export const removeAdjustment = (id: string) => ({
  type: REMOVE_ADJUSTMENT,
  payload: id,
});

export const updateAdjustment = (id: string, updatedData: Partial<AdminAdjustments_adminAdjustments_result>) => ({
  type: UPDATE_ADJUSTMENT,
  payload: { id, updatedData },
});


export const uploadAdjustment = (id: string, updatedData: Partial<AdminAdjustments_adminAdjustments_result>) => ({
    type: UPLOAD_ADJUSTMENTS,
    payload: { id, updatedData },
  });

export const fetchAdjustmentsRequest = () => ({
    type: FETCH_ADJUSTMENTS_REQUEST,
});