import styled from '@emotion/styled';
import { flexCenter } from '@styles/mixins';
import { usePrevious } from '@utils/hooks';

const Wrapper = styled.main`
	${flexCenter};
	height: 100vh;
`;

const ErrorMessage = styled.p`
	text-align: center;
	white-space: pre-wrap;
`;

function error() {
	usePrevious();

	return (
		<Wrapper>
			<ErrorMessage>{`주문에 실패하였습니다.\n다시 시도해주세요.`}</ErrorMessage>
		</Wrapper>
	);
}

export default error;
