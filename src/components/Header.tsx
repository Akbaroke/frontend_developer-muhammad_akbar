import { useHeadroom, useWindowScroll } from '@mantine/hooks';
import { SUITMEDIA_LOGO_WHITE } from '../assets';
import Container from './Container';
import NavLink, { PropsNavLink } from './NavLink';
import cn from '../utils/cn';

export default function Header() {
  const pinned = useHeadroom({ fixedAt: 120 });
  const [scroll] = useWindowScroll();

  return (
    <div
      className={cn('bg-primary py-[15px] sticky top-0 z-50 transition-all', {
        '-translate-y-28 duration-500': !pinned,
        'bg-opacity-80 backdrop-blur-sm': scroll.y > 0,
      })}>
      <Container className="flex justify-between items-center text-white">
        <img
          src={SUITMEDIA_LOGO_WHITE}
          alt="Suitmedia Logo"
          title="Suitmedia Logo"
          width={100}
          height={40}
        />

        <ul className="flex gap-5">
          {DataNavLink.map((item, index) => (
            <li key={index}>
              <NavLink {...item} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

const DataNavLink: PropsNavLink[] = [
  {
    title: 'Work',
    href: '',
  },
  {
    title: 'About',
    href: '',
  },
  {
    title: 'Services',
    href: '',
  },
  {
    title: 'Ideas',
    href: '',
  },
  {
    title: 'Careers',
    href: '',
  },
  {
    title: 'Contact',
    href: '',
  },
];
