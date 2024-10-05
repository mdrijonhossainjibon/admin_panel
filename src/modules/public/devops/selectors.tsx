import { RootState } from "modules";

 

// Selector to get permissions
export const selectPermissions = (state: RootState) => state.public.devops.permissions;

// Selector to check if data is loading
export const selectLoading = (state: RootState) => state.public.devops.loading;

// Selector to get error message
export const selectError = (state: RootState) => state.public.devops.error;
