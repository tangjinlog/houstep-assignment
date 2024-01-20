import styled from '@emotion/styled';
import Check from '@images/check.png';
import Image from 'next/image';
import { ani, flexCenter } from '@styles/mixins';
import { usePrevious } from '@utils/hooks';

const Wrapper = styled.section`
	${flexCenter};
	flex-direction: column;
	height: 100vh;
	gap: var(--gap-xs);
`;

const Motion = styled.div`
	${ani('tremble')};
`;

const CompleteMessage = styled.p`
	text-align: center;
`;

function complete() {
	usePrevious();
	return (
		<Wrapper>
			<Motion>
				<Image
					src={Check}
					width={48}
					height={48}
					alt={'Complete Check Image'}
				/>
			</Motion>
			<CompleteMessage>주문이 완료되었습니다.</CompleteMessage>
		</Wrapper>
	);
}

export default complete;
