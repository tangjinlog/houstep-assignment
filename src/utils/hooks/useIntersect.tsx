import { useCallback, useEffect, useRef } from 'react';

type IntersectHandlerType = (
	entry: IntersectionObserverEntry,
	observer: IntersectionObserver,
) => void;

function useIntersect(
	intersectHandler: IntersectHandlerType,
	options?: IntersectionObserverInit,
) {
	const ref = useRef<HTMLDivElement>(null);
	console.log(`ref`, ref);
	const detectIntersection = useCallback(
		(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) intersectHandler(entry, observer);
			});
		},
		[intersectHandler],
	);

	useEffect(() => {
		console.log(`uef ref`, ref);
		if (!ref.current) return;
		const observer = new IntersectionObserver(detectIntersection, options);
		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [ref, options, intersectHandler]);

	return ref;
}

export default useIntersect;
