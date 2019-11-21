import React from 'react';
import PropTypes from 'prop-types';
import { pluralize } from '../../../utils';

const DistanceTravelled = ({ distance }) => (
	<div className='location-stats'>
		<div className='distance'>
			<div className='left'>
				<img
					className='distance-preview'
					src='../../../../public/distance.png'
				/>
			</div>
			<div className='right'>
				<div className='distance-info'>
					<p>You have travelled</p>
					<h1 className='header-1'>
						{distance.toPrecision(4)} mile{pluralize(distance)}
					</h1>
					<p>
						to visit the{' '}
						<span className='pmmc'>
							Pacific Marine Mammal Center!
						</span>
					</p>

					<p>Thank you for taking the time to visit us</p>
				</div>
			</div>
		</div>
	</div>
);

DistanceTravelled.propTypes = {
	distance: PropTypes.number.isRequired,
};

export default DistanceTravelled;
