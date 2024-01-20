import Image from 'next/image';
import LogoBig from '@images/logo-black-lg.png';
import LogoMid from '@images/logo-black-sm.png';

interface LogoProps {
	size: 'big' | 'mid';
}

function Logo({ size }: LogoProps) {
	switch (size) {
		case 'big':
			return (
				<Image src={LogoBig} width={150} height={51} alt="Home Logo" priority />
			);
		case 'mid':
			return <Image src={LogoMid} height={32} alt="Home Logo" />;
	}
}

export default Logo;
