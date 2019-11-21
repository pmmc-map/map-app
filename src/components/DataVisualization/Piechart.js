import React, {Component, useState, useEffect } from 'react';
import { createClassFromSpec } from 'react-vega';

let DisplayData = createClassFromSpec('PieChart');
/*
To the poor soul who has to learn Vega... good luck
Online editor
https://vega.github.io/editor/#/
Documentation to Vega 3
https://vega.github.io/vega/docs/
 */
const PieChart = (data)=>{

	const [spec, setSpec] = useState(
		{
			'$schema': 'https://vega.github.io/schema/vega/v5.json',
			'width': 400,
			'height': 200,
			'autosize': 'none',

			'data': [
				{
					'name': 'visitors',
					'values': [
						{'id': 0, 'label': 'PMMC visitors \nfrom California', 'count': 35},
						{'id': 1, 'label': 'PMMC visitors \nfrom other states', 'count': 52},
					],
					'transform': [
						{
							'type': 'pie',
							'field': 'count',
						}
					]
				}
			],

			'scales': [
				{
					'name': 'color',
					'type': 'ordinal',
					'domain': {'data': 'visitors', 'field': 'id'},
					'range': {'scheme': 'category20'}
				},
				{
					'name': 'labels',
					'type': 'ordinal',
					'domain': {'data': 'visitors', 'field': 'label'},
					'range': {'scheme': 'category20'}
				}
			],

			'legends': [
				{
					'fill': 'labels',
					'title': '',
					'orient': 'none',
					'padding': {'value': 10},
					'encode': {
						'symbols': {'enter': {'fillOpacity': {'filed': []}}},
						'legend': {
							'update': {
								'x': {'signal': '(width / 2)', 'offset': 0},
								'y': {'signal': '(height / 2)', 'offset': -50}
							}
						},
						'labels': {
							'enter': {
								'fontSize': {'value': 20},
								'lineBreak': [{'value': '\n'}]
							}
						},
					}
				}
			],

			'marks': [
				{
					'type': 'arc',
					'from': {'data': 'visitors'},
					'encode': {
						'enter': {
							'fill': {'scale': 'color', 'field': 'id'},
							'x': {'signal': 'width/4'},
							'y': {'signal': 'height/2'},
							'startAngle': {'field': 'startAngle'},
							'endAngle': {'field': 'endAngle'},
							'padAngle': {'value': 0},
							'innerRadius': {'value': 0},
							'outerRadius': {'signal': '(width) / 4'},
							'cornerRadius': {'value': 0}
						}
					}
				}
			]
		}
	);

	return (
		<div>
			<DisplayData
				spec={spec}
				actions={false}
			/>
		</div>
	);
};

export default PieChart;