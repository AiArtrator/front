import React, { useState, useEffect } from 'react';
import './my-network-list.scss';
import NetworksItem from './NetworkItems/Index.js';
import { getMyNetworkListById } from '../../axios/Network';
import { useSelector } from 'react-redux';

const Index = () => {
	const userId = useSelector((state) => state.user.user.id);
	const nickname = useSelector((state) => state.user.user.nickname);
	const [networks, setNetworks] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setError(null);
			setNetworks(null);
			setLoading(true);

			try {
				const response = await getMyNetworkListById(userId);
				setNetworks(response.data.data.postList);
				console.log(response.data.data);
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
		return <div className="list-block">로딩 중</div>;
	}
	if (error) return <div>에러가 발생했습니다</div>;
	// 아직 networks값이 설정되지 않았을때
	if (!networks) {
		console.log('아직 networks값이 설정되지 않음');
		return null;
	}

	return (
		<div className="list-block">
			<div className="now-count">
				{nickname} 님이 업로드한 모델 리스트입니다.
			</div>

			{networks.map((network) => {
				return <NetworksItem key={network.id} network={network} />;
			})}
		</div>
	);
};

export default Index;
