import React from 'react';
import PropTypes from 'prop-types';

import SelectedPinInfo from './SelectedPinInfo';
import { ANIMAL_PICTURES } from '../../constants';

const AnimalInfo = ({
	animal_name,
	animal_type,
	location_name,
	placement_year,
	animal_notes,
	animal_images,
	onClickDismiss,
}) => {
	const [animalImg, setAnimalImg] = useState(null);

	return (
		<SelectedPinInfo
			headerImg={
				`data:image;base64,${animal_images}` ||
				'../../../assets/loading.gif'
			}
			onClickDismiss={onClickDismiss}
		>
			<>
				<h1 className='header-1'>{animal_name}</h1>
				<h2 className='header-2 dark'>{animal_type}</h2>
				<h2 className='header-2'>{`${location_name}, ${placement_year}`}</h2>
				<p>{animal_notes}</p>
			</>
		</SelectedPinInfo>
	);
};

AnimalInfo.propTypes = {
	animal_name: PropTypes.string.isRequired,
	animal_type: PropTypes.string.isRequired,
	animal_images: PropTypes.string.isRequired,
	location_name: PropTypes.string.isRequired,
	placement_year: PropTypes.number.isRequired,
	animal_notes: PropTypes.string.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
};

export default AnimalInfo;
