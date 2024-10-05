/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminTradingFees
// ====================================================

export interface AdminTradingFees_adminTradingFees {
  
  id: string;
  group: string;
  market_id: string;
  maker: string;
  taker: string;
  created_at ?: Date;
  updated_at?:Date;
}

export interface AdminTradingFees {
  adminTradingFees: AdminTradingFees_adminTradingFees[];
}

export interface AdminTradingFeesVariables {
  _barong_session?: string;
}
