import styled from '@emotion/styled';
import Header from '@molecules/Header';
import OrderTemp from '@templates/Order/OrderTemp';

const Wrapper = styled.section``;

function order() {
	return (
		<Wrapper>
			<Header />
			<OrderTemp />
		</Wrapper>
	);
}

export default order;
