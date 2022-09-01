import React, { useState, useEffect } from 'react';
import './purchased-network-list.scss';
import OwnNetworksItem from './PurchasedNetworkItems/Index.js';
import { getNetworkList } from '../../axios/Network';

const Index = () => {
	const [networks, setNetworks] = useState(null);
	const [networksCount, setNetworksCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);
			try {
				const response = await getNetworkList(null); // TODO : replace to getNetworkByUserId
				setNetworks(response.data.postList);
				setNetworksCount(response.data.postListCount);
			} catch (err) {
				console.error(err);
				setError(err);
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	// 대기중일때
	if (loading) {
		return <div className="own-list-block">로딩 중</div>;
	}
	if (error) return <div>에러가 발생했습니다</div>;
	// 아직 networks값이 설정되지 않았을때
	if (!networks) {
		console.log('아직 networks값이 설정되지 않음');
		return null;
	}

	console.log(networks);
	console.log('networks.postList');
	console.log(networks.postList);
	console.log('networksCount');
	console.log(networksCount);

	// networks 값이 유효할때
	return (
		<div className="own-list-block">
			{networksCount}
			{networks.map((network) => {
				return <OwnNetworksItem key={network.id} network={network} />;
			})}
		</div>
	);
};

export default Index;