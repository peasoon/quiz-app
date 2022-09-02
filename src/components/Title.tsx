import * as React from 'react';

interface ITitleProps {
	title: string
}

const Title: React.FunctionComponent<ITitleProps> = ({title}) => {
	return (
		<h2 className='main-title'>{title}</h2>
	);
};

export default Title;
