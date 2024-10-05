import { ActivityResult } from "constants/user";
import { FETCH_ACTIVITIES_FAILURE, FETCH_ACTIVITIES_REQUEST, FETCH_ACTIVITIES_SUCCESS } from "./constants";
 

export const fetchActivitiesRequest = () => ({
    type: FETCH_ACTIVITIES_REQUEST,
  });
  
  export const fetchActivitiesSuccess = (activities: ActivityResult[]) => ({
    type: FETCH_ACTIVITIES_SUCCESS,
    payload: activities,
  });
  
  export const fetchActivitiesFailure = (error: string) => ({
    type: FETCH_ACTIVITIES_FAILURE,
    payload: error,
  });