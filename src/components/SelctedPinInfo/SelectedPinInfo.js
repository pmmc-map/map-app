import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { useTransitionDelay } from '../../hooks';

const PinInfo = ({ onClickDismiss, headerImg, children, isShowing }) => {
	const isVisible = useTransitionDelay(isShowing, 300, false);

	return (
		<CSSTransition
			in={isVisible}
			timeout={300}
			classNames='confirmation-popup-animate'
			unmountOnExit
		>
			<div className='pin-info-popup'>
				<div className='pin-info-image'>
					<img src={headerImg} />
				</div>
				<div className='pin-info-content'>
					{children}
					<div className='centered-button-container'>
						<button className='button' onClick={onClickDismiss}>
							Close
						</button>
					</div>
				</div>
			</div>
		</CSSTransition>
	);
};

PinInfo.propTypes = {
	onClickDismiss: PropTypes.func.isRequired,
	headerImg: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	isShowing: PropTypes.bool.isRequired,
};

export default PinInfo;
