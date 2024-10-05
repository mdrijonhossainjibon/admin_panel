import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  rangerConnectFetch, selectRanger, selectShouldRangerConnect } from 'modules';


export const useRangerConnectFetch = () => {
	const dispatch = useDispatch();
	
	const shouldFetch = useSelector(selectShouldRangerConnect);
	const { connected, withAuth } = useSelector(selectRanger);

	React.useEffect(() => {
		if (!connected && shouldFetch) {
			dispatch(rangerConnectFetch({ withAuth: false }) as any);
		} else if (connected && !withAuth ) {
			dispatch(rangerConnectFetch({ withAuth: true }) as any);
		}
	}, [dispatch, shouldFetch, connected, withAuth ]);
};
