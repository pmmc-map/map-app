import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import SelectedPinInfo from './SelectedPinInfo';
import { ANIMAL_PICTURES } from '../../constants';

const AnimalInfo = ({
	animal_name,
	animal_type,
	location_name,
	placement_year,
	animal_notes,
	onClickDismiss,
}) => {
	const [animalImg, setAnimalImg] = useState(null);

	useEffect(() => {
		const getAnimalImg = () => {
			const imagesList = ANIMAL_PICTURES.filter(
				obj => obj.animal_name === animal_name
			);
			if (imagesList.length < 1)
				setAnimalImg('../../../assets/animals/unused/Raptor.PNG');
			else
				setAnimalImg('../../../assets/animals/' + imagesList[0].imgSrc);
		};

		getAnimalImg();
	}, [animal_name]);

	return (
		<SelectedPinInfo
			headerImg={animalImg || '../../../assets/loading.gif'}
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
	location_name: PropTypes.string.isRequired,
	placement_year: PropTypes.number.isRequired,
	animal_notes: PropTypes.string.isRequired,
	onClickDismiss: PropTypes.func.isRequired,
};

export default AnimalInfo;
