import {
    FETCH_BOT_CONFIG_FAILURE, FETCH_BOT_CONFIG_REQUEST, FETCH_BOT_CONFIG_SUCCESS, FETCH_CHANNEL_CONFIG_FAILURE, FETCH_CHANNEL_CONFIG_REQUEST, FETCH_CHANNEL_CONFIG_SUCCESS, PUT_BOT_CONFIG_REQUEST, PUT_BOT_CONFIG_SUCCESS, PUT_BOT_CONFIG_FAILURE,
    DELETE_BOT_CONFIG_REQUEST, DELETE_BOT_CONFIG_SUCCESS, DELETE_BOT_CONFIG_FAILURE,
    PUT_CHANNEL_CONFIG_REQUEST, PUT_CHANNEL_CONFIG_SUCCESS, PUT_CHANNEL_CONFIG_FAILURE,
    DELETE_CHANNEL_CONFIG_REQUEST, DELETE_CHANNEL_CONFIG_SUCCESS, DELETE_CHANNEL_CONFIG_FAILURE
} from "./constants";
import { BotConfig, ChannelConfig } from "./types";

// Async Action Creators for Bot Configuration
export const fetchBotConfigRequest = () => ({
    type: FETCH_BOT_CONFIG_REQUEST,
});

export const fetchBotConfigSuccess = (botConfig: Partial<BotConfig>) => ({
    type: FETCH_BOT_CONFIG_SUCCESS,
    payload: botConfig,
});

export const fetchBotConfigFailure = (error: string) => ({
    type: FETCH_BOT_CONFIG_FAILURE,
    payload: error,
});

// Async Action Creators for Channel Configuration
export const fetchChannelConfigRequest = () => ({
    type: FETCH_CHANNEL_CONFIG_REQUEST,
});

export const fetchChannelConfigSuccess = (channelConfig: Partial<ChannelConfig>) => ({
    type: FETCH_CHANNEL_CONFIG_SUCCESS,
    payload: channelConfig,
});

export const fetchChannelConfigFailure = (error: string) => ({
    type: FETCH_CHANNEL_CONFIG_FAILURE,
    payload: error,
});



export const putBotConfigRequest = (botConfig: Partial<BotConfig>) => ({
    type: PUT_BOT_CONFIG_REQUEST,
    payload: botConfig,
});

export const putBotConfigSuccess = (botConfig: Partial<BotConfig>) => ({
    type: PUT_BOT_CONFIG_SUCCESS,
    payload: botConfig,
});

export const putBotConfigFailure = (error: string) => ({
    type: PUT_BOT_CONFIG_FAILURE,
    payload: error,
});

// DELETE Action Creators for Bot Configuration
export const deleteBotConfigRequest = (botId: string) => ({
    type: DELETE_BOT_CONFIG_REQUEST,
    payload: botId,
});

export const deleteBotConfigSuccess = (botId: string) => ({
    type: DELETE_BOT_CONFIG_SUCCESS,
    payload: botId,
});

export const deleteBotConfigFailure = (error: string) => ({
    type: DELETE_BOT_CONFIG_FAILURE,
    payload: error,
});

// PUT Action Creators for Channel Configuration
export const putChannelConfigRequest = (channelConfig: Partial<ChannelConfig>) => ({
    type: PUT_CHANNEL_CONFIG_REQUEST,
    payload: channelConfig,
});

export const putChannelConfigSuccess = (channelConfig: Partial<ChannelConfig>) => ({
    type: PUT_CHANNEL_CONFIG_SUCCESS,
    payload: channelConfig,
});

export const putChannelConfigFailure = (error: string) => ({
    type: PUT_CHANNEL_CONFIG_FAILURE,
    payload: error,
});

// DELETE Action Creators for Channel Configuration
export const deleteChannelConfigRequest = (payload : { username ?:string , channelurl ?: string }) => ({
    type: DELETE_CHANNEL_CONFIG_REQUEST,
    payload,
});

export const deleteChannelConfigSuccess = (channelId: string) => ({
    type: DELETE_CHANNEL_CONFIG_SUCCESS,
    payload: channelId,
});

export const deleteChannelConfigFailure = (error: string) => ({
    type: DELETE_CHANNEL_CONFIG_FAILURE,
    payload: error,
});