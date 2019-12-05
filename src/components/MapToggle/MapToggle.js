import React, { useContext } from 'react';

import { MapContext } from '../../MapContext';

const MapToggle = () => {
	const { toggleMapLayers, isLayerMaps } = useContext(MapContext);
	return (
		<button
			className='button button-transparent button-top-left'
			onClick={toggleMapLayers}
		>
			Use {isLayerMaps ? 'Satellite' : 'Maps'} view
		</button>
	);
};

export default MapToggle;
