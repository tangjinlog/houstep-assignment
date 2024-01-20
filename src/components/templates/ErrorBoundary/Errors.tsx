import styled from '@emotion/styled';
import Button from '@atoms/Button';
import { flexCenter, flexColumn } from '@styles/mixins';
import { fontMid } from '@styles/fonts';

const Wrapper = styled.section`
	${flexCenter};
	position: absolute;
	width: 100%;
	height: 100vh;
`;

const ContentsWrapper = styled.section`
	${flexColumn}
	gap: var(--gap-m);
	justifycontent: center;
	white-space: pre-wrap;
	text-align: center;
`;

const Title = styled.h1``;

const ErrorMessage = styled.p``;

const ButtonBox = styled.div`
	${flexCenter}
	gap: var(--gap-m);
`;

const BackButton = styled(Button)`
	${fontMid}
	width: 140px;
	padding: 1rem;
	&:hover {
		color: var(--white);
		background-color: var(--black);
	}
`;

const RetryButton = styled(BackButton)``;

interface PropTypes {
	onClickRetry: () => void;
}

export function AuthError() {
	return (
		<Wrapper>
			<ContentsWrapper>
				<Title>로그인이 필요한 페이지입니다.</Title>
				<ButtonBox>
					<BackButton onClick={() => (window.location.href = '/')}>
						메인으로 가기
					</BackButton>
					<RetryButton
						onClick={() => {
							console.log('로그인 미구현');
						}}
					>
						로그인 하기
					</RetryButton>
				</ButtonBox>
			</ContentsWrapper>
		</Wrapper>
	);
}

export function UnknownError({ onClickRetry }: PropTypes) {
	return (
		<Wrapper>
			<ContentsWrapper>
				<Title>서비스 에러가 발생 하였습니다.</Title>
				<ErrorMessage>{`죄송합니다.\n기술적인 문제로인해\n일시적으로 서비스를 사용할 수 없습니다\n관리자에게 요청하여 빠른 시간 안에 해결 하겠습니다.`}</ErrorMessage>
				<ButtonBox>
					<BackButton onClick={() => (window.location.href = '/')}>
						메인으로 가기
					</BackButton>
					<RetryButton onClick={onClickRetry}>다시 시도</RetryButton>
				</ButtonBox>
			</ContentsWrapper>
		</Wrapper>
	);
}
