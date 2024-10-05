import { AlerstMessage, Alert, AlertAction, MobileAlerPush, Status } from './actions'; // Assuming Status and other types/interfaces are correctly defined
import { ALERT_DATA, ALERT_DELETE, ALERT_DELETE_ALL, ALERT_DELETE_BY_INDEX } from './constants';
import { notification, message } from 'antd';
import { Toast } from 'antd-mobile';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined  } from '@ant-design/icons';

// Define the interface for the alert state
export interface AlertState {
  alerts: Alert[];
}

// Initial state for alerts
export const initialAlertState: AlertState = { alerts: [] };

const getMessageTypeIcon = (type: Status | 'loading' | undefined) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'error':
      return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
    case 'loading':
      return <LoadingOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
    default:
      return null;
  }
};

// Alert reducer function
export const alertReducer = (state = initialAlertState, actions: AlertAction): AlertState => {
  switch (actions.type) {
    case ALERT_DATA:
      switch (actions.payload.type as 'web' | 'mobile' | 'message') {
        case 'web':
          const { show, message: webMessage } = actions.payload;
          if (webMessage) {
            notification.config({ ...actions.payload.confing  })
            notification[show || 'error']({
              message: webMessage as any,
              description: null,
              icon: getMessageTypeIcon(show || 'error'),
              
            });
          }
          break;
        case 'mobile':
          const mobileContent = actions.payload as MobileAlerPush;
          if (mobileContent.message !== undefined) {
            Toast.config({ ...mobileContent.confing });
            Toast.show({content : mobileContent.message as any  , ...mobileContent  })
            
          } 
          break
        case 'message':
          const messageContent = actions.payload as AlerstMessage;
          if (messageContent.message !== undefined) {
            
            message[messageContent.status || 'error']({
              content: messageContent.message as any,
              icon: getMessageTypeIcon(messageContent.status || 'error'),
            });
          }
          break;
        default:
          break;
      }

      return {
        alerts: [...state.alerts, actions.payload],
      };

    case ALERT_DELETE_ALL:
      // Delete all alerts
      return {
        alerts: [],
      };
    case ALERT_DELETE:
      // Delete the first alert
      return {
        alerts: [...state.alerts.slice(1, state.alerts.length)],
      };
    case ALERT_DELETE_BY_INDEX:
      // Delete alert by index
      return {
        alerts: [
          ...state.alerts.slice(0, actions.index),
          ...state.alerts.slice(actions.index + 1),
        ],
      };
    default:
      return state;
  }
};
