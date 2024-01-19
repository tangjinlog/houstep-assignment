import styled from '@emotion/styled';
import Check from '@images/check.png';
import Image from 'next/image';
import { flexCenter } from '@styles/mixins';

const Wrapper = styled.main`
	${flexCenter};
	flex-direction: column;
	height: 100vh;
	gap: var(--gap-xs);
`;

const CompleteMessage = styled.p`
	text-align: center;
`;

function complete() {
	return (
		<Wrapper>
			<Image src={Check} width={48} height={48} alt={'Complete Check Image'} />
			<CompleteMessage>주문이 완료되었습니다.</CompleteMessage>
		</Wrapper>
	);
}

export default complete;