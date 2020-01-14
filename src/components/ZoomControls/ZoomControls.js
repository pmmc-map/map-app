import React, { useContext } from 'react';
import './style.css';

import { MapContext } from '../../MapContext';

const ZoomControls = () => {
	const { zoom } = useContext(MapContext);

	return (
		<div className='zoom-controls'>
			<div onClick={() => zoom('in')}>+</div>
			<div onClick={() => zoom('out')}>-</div>
		</div>
	);
};

export default ZoomControls;
