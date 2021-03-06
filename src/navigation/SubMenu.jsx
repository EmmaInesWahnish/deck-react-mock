import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContextProvider.jsx"
import styled from 'styled-components';
//import { useTranslation } from 'react-i18next';

const SubMenu = ({ val }, { key }) => {
	const [subnav, setSubnav] = useState(false);
	//const [t, i18n] = useTranslation("translations");
	const showSubnav = () => setSubnav(!subnav);

	function toggle(value) {
		value = !value
	}

	return (
		<>
			<Link key={key} to={val.path} >
				<div className='cornsilk p-1' onClick={val.subNav && showSubnav}>{val.icon} {val.name}
					{val.subNav && subnav
						? toggle(val.isOpen)
						: val.subNav
							? toggle(val.isOpen)
							: null}
				</div>
			</Link>
			{
				subnav ?
					<>
						{val.subNav && val.subNav.map((val, key) => {
							return (
								<Link to={val.path} key={key + 'IT'}>
									<div className='cream p-2'>
										{val.icon} {val.name}
									</div>
								</Link>
							)
						})}
					</>
					:
					<></>
			}
		</>
	)
}

export default SubMenu;