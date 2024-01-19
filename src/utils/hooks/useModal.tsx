import { createPortal } from 'react-dom';
import React, { Children, isValidElement, useCallback, useState } from 'react';

interface TitlePropsType {
	children: React.ReactNode;
}

interface CancelButtonPropsType {
	children: React.ReactNode;
}

interface ExecuteButtonPropsType {
	children: React.ReactNode;
	unBlockingWithCallback: (callback?: undefined | (() => void)) => void;
}

type ModalType = {
	(props: { children: React.ReactNode }): React.ReactPortal | null;
	Overlay: () => React.JSX.Element;
	Title: (props: TitlePropsType) => React.JSX.Element;
	CancelButton: (props: CancelButtonPropsType) => React.JSX.Element;
	ExecuteButton: (props: ExecuteButtonPropsType) => React.JSX.Element;
};

type ReturnType = [Modal: ModalType, handleOpen: () => void];

function useModal(): ReturnType {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOpen = useCallback(() => {
		setIsOpen(true);
		document.body.style.overflow = 'hidden';
	}, [isOpen]);

	const handleClose = useCallback(() => {
		setIsOpen(false);
		document.body.style.overflow = 'auto';
	}, [isOpen]);

	//FIXME: to Emotion
	const overlayStyle = {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		// zIndex: '999',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	} as const;

	const Overlay = () => {
		return <div style={overlayStyle}></div>;
	};

	const Title = ({ children }: { children: React.ReactNode }) => {
		return (
			<h2 style={{ color: 'black', position: 'relative', zIndex: '999' }}>
				{children}
			</h2>
		);
	};

	const CancelButton = ({ children }: { children: React.ReactNode }) => {
		return (
			<div
				style={{ position: 'relative', zIndex: '999', display: 'inline-block' }}
			>
				<button style={{ color: 'black' }} onClick={handleClose}>
					{children}
				</button>
			</div>
		);
	};

	const ExecuteButton = ({
		children,
		unBlockingWithCallback,
	}: ExecuteButtonPropsType) => {
		return (
			<div
				style={{ position: 'relative', zIndex: '999', display: 'inline-block' }}
			>
				<button
					style={{ color: 'black' }}
					onClick={() => unBlockingWithCallback()}
				>
					{children}
				</button>
			</div>
		);
	};

	type PropsType<T extends string> = { children: React.ReactNode } & {
		[K in T]: () => void;
	} & ExecuteButtonPropsType;

	const findChildren = (
		children: React.ReactNode,
		targetChildren: <T extends string>(
			props: PropsType<T>,
		) => React.JSX.Element,
	) => {
		const childrenArray = Children.toArray(children);
		return childrenArray
			.filter((child) => isValidElement(child) && child.type == targetChildren)
			.slice(0, 2);
	};

	const Modal = ({ children }: { children: React.ReactNode }) => {
		if (!isOpen) {
			return null;
		}

		const modalOverlay = findChildren(children, Overlay);
		const modalTitle = findChildren(children, Title);
		const modalCancelButton = findChildren(children, CancelButton);
		const modalExecuteButton = findChildren(children, ExecuteButton);

		//FIXME: to Emotion
		return createPortal(
			<div
				style={{
					position: 'fixed',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					zIndex: '999',
				}}
			>
				{modalOverlay ? <>{modalOverlay}</> : null}
				<div
					style={{
						outline: 'solid 5px limegreen',
						width: '300px',
						height: '100px',
						background: 'white',
						zIndex: '999',
					}}
				>
					{modalTitle ? <>{modalTitle}</> : null}
					{modalCancelButton ? <>{modalCancelButton}</> : null}
					{modalExecuteButton ? <>{modalExecuteButton}</> : null}
				</div>
			</div>,
			document.getElementById('modal')!,
		);
	};
	Modal.Overlay = Overlay;
	Modal.Title = Title;
	Modal.CancelButton = CancelButton;
	Modal.ExecuteButton = ExecuteButton;

	return [Modal, handleOpen];
}

export default useModal;
