/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminWithdraws
// ====================================================

export interface AdminWithdraws_adminWithdraws_result_currency {
  
  code: string;
  type: string;
  explorer_transaction: string;
  explorer_address: string;
}

export interface AdminWithdraws_adminWithdraws_result_member_user_profiles {
  
  first_name: string;
  last_name: string;
}

export interface AdminWithdraws_adminWithdraws_result_member_user {
   
  uid: string;
  email: string;
  profiles: AdminWithdraws_adminWithdraws_result_member_user_profiles[];
}

export interface AdminWithdraws_adminWithdraws_result_member {
   
  user: AdminWithdraws_adminWithdraws_result_member_user;
}

export interface AdminWithdraws_adminWithdraws_result_beneficiary {
   
  id: number;
  name: string;
  state: string;
}

export interface AdminWithdraws_adminWithdraws_result {
   
  id: number;
  currency: AdminWithdraws_adminWithdraws_result_currency;
  type: string;
  sum: number;
  fee: number;
  blockchain_txid: string;
  rid: string;
  state: string;
  confirmations: number;
  note: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  member: AdminWithdraws_adminWithdraws_result_member;
  beneficiary: AdminWithdraws_adminWithdraws_result_beneficiary;
  account: string;
  block_number: number;
  amount: number;
  tid: string;
}

export interface AdminWithdraws_adminWithdraws {
  __typename: "AdminWithdrawsPaginated";
  page: number;
  perPage: number;
  total: number;
  result: AdminWithdraws_adminWithdraws_result[];
}

export interface AdminWithdraws {
  adminWithdraws: AdminWithdraws_adminWithdraws;
}

export interface AdminWithdrawsVariables {
  _barong_session?: string;
  state?: string[];
  id?: number;
  txid?: string;
  tid?: string;
  confirmations?: number;
  rid?: string;
  uid?: string;
  currency?: string;
  type?: string;
  range?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  ordering?: string;
  order_by?: string;
}
