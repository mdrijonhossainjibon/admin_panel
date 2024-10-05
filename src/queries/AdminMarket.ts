/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminMarket
// ====================================================

 

export interface AdminMarket_adminMarket {
  
  amount_precision: number;
  base_unit: string;
  created_at: string;
  id: string;
  max_price: string;
  min_amount: string;
  min_price: string;
  name: string;
  position: number;
  price_precision: number;
  quote_unit: string;
  enabled: boolean;
  updated_at: string;
  base_currency: string;
  quote_currency: string
  visible: boolean;
}


export interface AdminMarket {
  adminMarket: AdminMarket_adminMarket;
}

export interface AdminMarketVariables {
  _barong_session?: string;
  id?: string;
}
