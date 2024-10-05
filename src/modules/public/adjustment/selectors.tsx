// selectors.ts
import { RootState } from 'modules'; // Assuming you have a root reducer
import { AdminAdjustments_adminAdjustments_result } from 'queries/AdminAdjustments';
 

export const selectAdjustments = (state: RootState): AdminAdjustments_adminAdjustments_result[] => state.public.adjustments.data;
 
export const select_Adjustments_loading = (state: RootState)  =>  state.public.adjustments.loading;
export const selectAdjustments_error = (state: RootState)  =>  state.public.adjustments.error