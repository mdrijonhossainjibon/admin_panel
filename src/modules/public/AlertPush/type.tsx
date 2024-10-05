import * as React from 'react';
import  PurePanel from 'antd/es/notification'
import type { ArgsProps } from 'antd/es/notification/interface';
import useNotification from 'antd/es/notification/useNotification';
export interface BaseMethods {
    open?: (config: ArgsProps) => void;
    destroy?: (key?: React.Key) => void;
    config?: any;
    useNotification?: typeof useNotification;
    /** @private Internal Component. Do not use in your production. */
    _InternalPanelDoNotUseOrYouWillBeFired?: typeof PurePanel;
}
type StaticFn = (config: ArgsProps) => void;

export interface NoticeMethods {
    success?: StaticFn;
    info?: StaticFn;
    warning?: StaticFn;
    error?: StaticFn;
}
 ;
