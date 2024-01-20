import styled from '@emotion/styled';
import { flexCenter } from '@styles/mixins';

const Wrapper = styled.section`
	${flexCenter};
	width: 100%;
	height: calc(100vh - 170px);
	text-align: center;
	white-space: pre-wrap;
`;
const LoadingContent = styled.p``;

interface LoadingProps {
	type: 'order' | 'other';
}

const content = {
	order: `목록을\n불러오고 있습니다.`,
	other: `로딩중입니다...`,
};

function Loading({ type }: LoadingProps) {
	return (
		<Wrapper>
			<LoadingContent>{content[type]}</LoadingContent>
		</Wrapper>
	);
}

export default Loading;
