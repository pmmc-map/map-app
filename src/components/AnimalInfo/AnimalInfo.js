import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
		const getAnimalImg = async () => {
			setAnimalImg('../../../public/animals/tiny.jpg');
		};

		getAnimalImg();
	}, []);

	return (
		<div className='pin-info-popup'>
			<div className='pin-info-image'>
				<img src={animalImg} />
			</div>
			<div className='pin-info-content'>
				<h1 className='header-1'>{animal_name}</h1>
				<h2 className='header-2 dark'>{animal_type}</h2>
				<h2 className='header-2'>{`${location_name}, ${placement_year}`}</h2>
				<p>{animal_notes}</p>
				<div className='centered-button-container'>
					<button className='button' onClick={onClickDismiss}>
						Close
					</button>
				</div>
			</div>
		</div>
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