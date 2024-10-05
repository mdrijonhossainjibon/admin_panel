import * as React from 'react';
 

export const useDocumentTitle = (title :any) => {
	React.useEffect(() => {
		document.title = ['PG_TITLE_PREFIX', title].join(': ');
	}, [title]);
};
