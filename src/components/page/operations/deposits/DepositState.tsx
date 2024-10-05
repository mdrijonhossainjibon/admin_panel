import { useState } from "react";
import { CurrencyType } from "../../../../constants/currencies";
import { DepositActionMap, DepositState } from "../../../../constants/deposits";

import { TagProps } from "antd/lib/tag";

import { useTranslation } from "react-i18next";

import { Badge, Select, Space, Tag } from "antd";

const depositStateColors: {
  [key in CurrencyType]: {
    [key in DepositState]?: TagProps["color"];
  };
} = {
  [CurrencyType.Fiat]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Accepted]: "success",
    [DepositState.Collected]: "success",
    [DepositState.Rejected]: "error",
  },
  [CurrencyType.Coin]: {
    [DepositState.Submitted]: "processing",
    [DepositState.Collected]: "success",
    [DepositState.Accepted]: "warning",
    [DepositState.Skipped]: "error",
  },
};

export default ({ deposit }: { deposit: any }) => {
  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const [depositState] = useState<DepositState>(deposit.state as DepositState);




  const colorType: TagProps["color"] =
    depositStateColors[deposit.type as CurrencyType][depositState as DepositState] || "default";

  return !!DepositActionMap[depositState] && deposit.type === CurrencyType.Fiat ? (
    <Select

      value={t(`table.state.${depositState}`)}

    >
      {DepositActionMap[depositState]?.map((value) => (
        <Select.Option key={value} value={value}>
          {t(`table.state.${value}`)}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <><Space> <Badge status={depositState as any} text />  <Tag color={colorType}>{t(`table.state.${depositState}`)} </Tag> </Space>  </>
  );
};
