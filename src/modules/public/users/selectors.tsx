import { RootState } from "modules";

export const SelectoUserLIst = (state : RootState) => state.public.userlist;
export const SelectoUser = (state : RootState) => state.public.userlist.user;
export const SelectoUserLIstLoading = (state : RootState) => state.public.userlist.loading;