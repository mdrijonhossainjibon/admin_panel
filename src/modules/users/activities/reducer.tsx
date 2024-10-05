import { FETCH_ACTIVITIES_SUCCESS } from "./constants";

 
// Define the activity types
export enum ActivityResult {
    Succeed = "Succeed",
    Failed = "Failed",
  }

// Define the initial state as an array of activities
const initialState = [
  {
    user_agent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    data: '{"note": "Sample note"}',
    created_at: "2023-07-28T12:34:56Z",
    action: "login",
    topic: "session",
    result: 'succeed',
    user_ip: "192.168.0.1",
  },
];

 
// Define the activity interface
interface Activity {
  user_agent: string;
  data: string;
  created_at: string;
  action: string;
  topic: string;
  result: string;
  user_ip: string;
}
 
// The reducer function
export const activitiesReducer = (   state: Activity[] = initialState,  action  :any): Activity[] => {
  switch (action.type) {
    case FETCH_ACTIVITIES_SUCCESS:
      return [ ...action.payload ];
    default:
      return state;
  }
};

 