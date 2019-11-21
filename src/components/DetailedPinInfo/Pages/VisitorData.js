import React from 'react';
import PropTypes from 'prop-types';

import { pluralize, pluralizeIsAre } from '../../../utils';

const VisitorData = ({ country_count, city_count }) => (
	<>
		<div className='location-stats'>
			<div className='left'>
				<div className='stats-graph'>
					<img src='../../../../public/statsplaceholder.png' />
				</div>
			</div>
			<div className='right'>
				<div className='visitor-count'>
					<h1 className='big-number visitors-country'>
						{`${country_count} visitor${pluralize(country_count)}`}
					</h1>
					<span className='visitor-stats'>
						{`${pluralizeIsAre(country_count)} `} from your country
					</span>

					<h1 className='big-number visitors-city'>
						{`${city_count} visitor${pluralize(city_count)}`}
					</h1>
					<span className='visitor-stats'>
						{`${pluralizeIsAre(city_count)} `} from your city
					</span>
				</div>
			</div>
		</div>
	</>
);
VisitorData.propTypes = {
	city_count: PropTypes.number.isRequired,
	country_count: PropTypes.number.isRequired,
};
export default VisitorData;
