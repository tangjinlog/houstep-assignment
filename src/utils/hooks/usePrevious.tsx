import { useRouter } from 'next/router';
import { useEffect } from 'react';

function usePrevious() {
	const router = useRouter();

	useEffect(() => {
		const id = setTimeout(() => {
			router.back();
		}, 3000);

		return () => clearTimeout(id);
	}, [router]);
}

export default usePrevious;
