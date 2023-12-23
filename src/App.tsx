import { useWindowScroll } from '@mantine/hooks';
import { BG_BANNER } from './assets';
import Banner from './components/Banner';
import Header from './components/Header';
import ListPost from './components/ListPost';

export default function App() {
  const [scroll] = useWindowScroll();

  const parallaxStyle = {
    transform: `translateY(${-scroll.y * 0.2}px)`,
  };

  return (
    <>
      <img
        src={BG_BANNER}
        alt="Banner"
        className="brightness-75 fixed z-0 right-0 left-0 top-0 bottom-0 w-screen"
        style={parallaxStyle}
      />
      <div className="relative z-20">
        <Header />
        <Banner />
        <div className="bg-white min-h-screen pb-20">
          <ListPost />
        </div>
      </div>
    </>
  );
}
