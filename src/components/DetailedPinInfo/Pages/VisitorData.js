import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../../DataVisualization/Piechart';

import { pluralize, pluralizeIsAre } from '../../../utils';

const VisitorData = ({
	country_count,
	city_count,
	city,
	state,
	country,
	graphData,
}) => (
	<>
		<div className='location-stats visitor-data-page'>
			<div className='left data-graph'>
				<PieChart
					data={graphData}
					city={city}
					state={state}
					country={country}
				/>
			</div>
			<div className='right'>
				<div className='visitor-count'>
					<h1 className='header-1 big-number visitors-country'>
						{`${country_count} visitor${pluralize(country_count)}`}
					</h1>
					<span className='visitor-stats'>
						{`${pluralizeIsAre(country_count)} `} from your country
					</span>
					{city ? (
						<>
							<h1 className='header-1 big-number visitors-city'>
								{`${city_count} visitor${pluralize(
									city_count
								)}`}
							</h1>
							<span className='visitor-stats'>
								{`${pluralizeIsAre(city_count)} `} from your
								city
							</span>
						</>
					) : null}
				</div>
			</div>
		</div>
	</>
);
VisitorData.propTypes = {
	city_count: PropTypes.number.isRequired,
	country_count: PropTypes.number.isRequired,
	city: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	graphData: PropTypes.object.isRequired,
};
export default VisitorData;
