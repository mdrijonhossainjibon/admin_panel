import { FETCH_BOT_CONFIG_FAILURE, FETCH_BOT_CONFIG_REQUEST, FETCH_BOT_CONFIG_SUCCESS, FETCH_CHANNEL_CONFIG_FAILURE, FETCH_CHANNEL_CONFIG_REQUEST, FETCH_CHANNEL_CONFIG_SUCCESS } from "./constants";

// Define the type for the Bot Configuration
export interface BotConfig {
    token: string;
    toggle_bot: 'on' | 'off';  // 'on' or 'off' status
    withdraw : 'enabled' | 'disabled';
    tg_group : ChannelConfig []
}

// Define the type for the Channel Configuration
export interface ChannelConfig {
    key : string;
    username : string;
    channelurl: string;
    role : 'admin' | 'member';
    status :  'active' | 'deactive';
}

// Define the overall state structure for the Telegram reducer
export interface TelegramState {
    botConfig: BotConfig;
    channelConfig: ChannelConfig[];
    loading: boolean;
    error: string | null;
}

// Define the action types as string constants
const SET_BOT_CONFIG = 'SET_BOT_CONFIG';
const SET_CHANNEL_CONFIG = 'SET_CHANNEL_CONFIG';
const RESET_CONFIG = 'RESET_CONFIG';

// Define the structure of the actions
interface SetBotConfigAction {
    type: typeof SET_BOT_CONFIG;
    payload: Partial<BotConfig>;
}

interface SetChannelConfigAction {
    type: typeof SET_CHANNEL_CONFIG;
    payload: Partial<ChannelConfig>;
}

interface ResetConfigAction {
    type: typeof RESET_CONFIG;
}

interface SetBotConfigAction {
    type: typeof SET_BOT_CONFIG;
    payload: Partial<BotConfig>;
}

interface SetChannelConfigAction {
    type: typeof SET_CHANNEL_CONFIG;
    payload: Partial<ChannelConfig>;
}

interface ResetConfigAction {
    type: typeof RESET_CONFIG;
}

// Define actions for async operations (Saga actions)
interface FetchBotConfigRequestAction {
    type: typeof FETCH_BOT_CONFIG_REQUEST;
}

interface FetchBotConfigSuccessAction {
    type: typeof FETCH_BOT_CONFIG_SUCCESS;
    payload: Partial<BotConfig>;
}


interface FetchBotConfigFailureAction {
    type: typeof FETCH_BOT_CONFIG_FAILURE;
    payload: string; // error message
}

interface FetchChannelConfigRequestAction {
    type: typeof FETCH_CHANNEL_CONFIG_REQUEST;
}

interface FetchChannelConfigSuccessAction {
    type: typeof FETCH_CHANNEL_CONFIG_SUCCESS;
    payload: Partial<ChannelConfig >;
}

interface FetchChannelConfigFailureAction {
    type: typeof FETCH_CHANNEL_CONFIG_FAILURE;
    payload: string; // error message
}

export type TelegramAction =
    | SetBotConfigAction
    | SetChannelConfigAction
    | ResetConfigAction
    | FetchBotConfigRequestAction
    | FetchBotConfigSuccessAction
    | FetchBotConfigFailureAction
    | FetchChannelConfigRequestAction
    | FetchChannelConfigSuccessAction
    | FetchChannelConfigFailureAction;
