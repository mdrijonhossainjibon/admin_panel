import { useEffect, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { CloudUploadOutlined, EllipsisOutlined, FileAddOutlined, InboxOutlined, ReloadOutlined } from "@ant-design/icons";
import { AdminAdjustments_adminAdjustments_result, AdminAdjustmentsVariables } from "../../../../queries/AdminAdjustments";
import { Button, Modal, Card, Select, Space, Table, Tag, message, Upload } from "antd";
import { AdjustmentAction, AdjustmentCategory, AdjustmentState } from "../../../../constants/adjustments";


import { useTranslation } from "react-i18next";

import { Routes } from "../../../../constants/routes";
import qs from "querystring";
import { WithdrawState } from "../../../../constants/withdraws";
import { TagProps } from "antd/lib/tag";
import { useHistory } from "react-router-dom";
import Dragger from "antd/es/upload/Dragger";
import { addAdjustment, alertPush, selectAdjustments } from "modules";
import { useDispatch, useSelector } from "react-redux";

const adjustmentStateColors: { [key in AdjustmentState]: TagProps["color"] } = {
  [AdjustmentState.Accepted]: "success",
  [AdjustmentState.Pending]: "warning",
  [AdjustmentState.Rejected]: "error",
};

 

type NestedKeyOf<ObjectType extends object> =
  { [Key in keyof ObjectType & (string | number)]:
    ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

  function checkPathExists<T>(arr: T[], path: string): { success: boolean, message?: string } {
    if (!Array.isArray(arr)) {
      return { success: false, message: "Input is not a valid array." };
    }

    if (!path) {
      return { success: false, message: "Path is not provided." };
    }

    const keys = path.split('.');

    for (const obj of arr) {
      let current: any = obj;
      for (let key of keys) {
        // Check if the key is an array index like "adjustments[0]"
        const arrayMatch = key.match(/(\w+)\[(\d+)\]/);
        if (arrayMatch) {
          const arrayKey = arrayMatch[1]; // the object key (e.g., "adjustments")
          const index = parseInt(arrayMatch[2]); // the array index (e.g., "0")
          if (current[arrayKey] && Array.isArray(current[arrayKey]) && current[arrayKey][index] !== undefined) {
            current = current[arrayKey][index];
          } else {
            return { success: false, message: `Array key or index '${key}' is not found.` };
          }
        } else {
          if (current && key in current) {
            current = current[key];
          } else {
            return { success: false, message: `Key '${key}' is not found.` };
          }
        }
      }
    }

    return { success: true };
  }

export default function Adjustments() {
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.adjustments.${id}`);

  const goToAdjustmentDetails = (id: string) => {
    history.push(Routes.withParams.AdjustmentDetails({ id }));
  };

  const dispatch = useDispatch();


  const [filter, setFilter] = useState<AdminAdjustmentsVariables>({});

 


 const  Adjustments = useSelector(selectAdjustments)


  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: '.json', // Limit file selection to JSON files
    beforeUpload(file: File) {
      const isJson = file.type === 'application/json';
      if (!isJson) {
        message.error('You can only upload JSON files!');
      }
      return isJson || Upload.LIST_IGNORE; // Prevent upload if not a JSON file
    },
    customRequest({ file, onSuccess }: any) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(content);
          
          onSuccess(null, file);

          const pathsToCheck: NestedKeyOf<any>[] = [
            'id',
            'receiving_member.uid',
            'reason',
            'amount',
            'currency.code',
            'category',
            'creator.uid',
            'state'
          ];

          // Check each path and log the result
          pathsToCheck.forEach(path => {
            const result = checkPathExists(parsedData, path);
            if (!result.success) {
              dispatch(alertPush({ message: [result.message as string], status: 'error' }))
               return;
            }

            dispatch(addAdjustment(parsedData))
 
          });



        } catch (err) {
          message.error('Failed to parse JSON file');
        }
      };
      reader.readAsText(file);
    }
  };



  // Function to check if key path exists


  // Function to check if a key path exists in an object

  

  const stateFilters = Object.values(WithdrawState).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const changeFilter = (filter: AdminAdjustmentsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const columns: ColumnsType<AdminAdjustments_adminAdjustments_result> = [
    {
      title: t("table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("table.uid"),
      dataIndex: ["receiving_member", "uid"],
      key: "receiving_member.uid",
    },
    {
      title: t("table.reason"),
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: t("table.amount"),
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t("table.currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (value: string) => value.toUpperCase(),
    },
    {
      title: t("table.category"),
      dataIndex: "category",
      key: "category",
      render: (category: AdjustmentCategory) => t(`category.${category}`),
    },
    {
      title: t("table.creator"),
      dataIndex: ["creator", "uid"],
      key: "creator.uid",
    },
    {
      title: t("table.receivingAccountCode"),
      dataIndex: "receiving_account_code",
      key: "receiving_account_code",
    },
    {
      title: t("table.state"),
      dataIndex: "state",
      key: "state",
      filters: stateFilters,
      filterMultiple: false,
      filtered: filter && filter.state ? true : false,
      filteredValue: filter && filter.state ? [filter.state] : [],
      render: (_, row) => <AdjustmentStateCell adjustment={row} t={t} />,
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToAdjustmentDetails(row.id as any)} />;
      },
    },
  ];

  const extraHeaderContent = (
    <Space>
      <Button icon={<ReloadOutlined />} >
        {t("table.reload")}
      </Button>
      <Button icon={<FileAddOutlined />} type="primary" onClick={() => setModalOpen(true)}>
        {t("table.newAdjustment")}
      </Button>
      <Button icon={<CloudUploadOutlined />} type='dashed' onClick={() => setModalOpen(true)}>
        Upolad
      </Button>
    </Space>
  );

  return (
    <>
      <Card
        className="setter-page-header"
        title={translate("setter.layouts.operations.nav.adjustments")}

        extra={extraHeaderContent}
      >
        <Table
          bordered

          dataSource={ Adjustments }
          rowKey="id"
          columns={columns}
          onChange={(p, f) => {
            const params: any = {
              page: p.current,
              limit: p.pageSize,
            };
            if (f.currency && f.currency.length !== 0) {
              params.currency = f.currency[0];
            }
            if (f.state && f.state.length !== 0) {
              params.state = f.state[0];
            }
            if (changeFilter) {
              changeFilter(params);
            }
          }}
          pagination={{
            position: ["bottomLeft"],
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </Card>
      <Modal
        title={t("form.title")}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        AdjustmentForm
        <Dragger    {...props}><p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p></Dragger>
      </Modal>
    </>
  );
}

const AdjustmentStateCell = ({ adjustment, t, }: { adjustment: AdminAdjustments_adminAdjustments_result; t: (id: string) => string; }) => {
  const [adjustmentState, setAdjustmentState] = useState<AdjustmentState>(adjustment.state as AdjustmentState);

  const onCompleted = (data: any) => setAdjustmentState((data?.actionAdjustment?.state as AdjustmentState) || adjustmentState);
  console.log(onCompleted)

  useEffect(() => {
    setAdjustmentState(adjustment.state as AdjustmentState);
  }, [adjustment.state]);

  return adjustmentState === AdjustmentState.Pending ? (
    <Select

      onClick={(e) => e.stopPropagation()}
      value={t(`state.${adjustmentState}`)}

    >
      {Object.values(AdjustmentAction).map((action) => (
        <Select.Option key={action} value={action}>
          {t(`state.${action}`)}
        </Select.Option>
      ))}
    </Select>
  ) : (
    <Tag color={adjustmentStateColors[adjustmentState]}>{t(`state.${adjustmentState}`)}</Tag>
  );
};
