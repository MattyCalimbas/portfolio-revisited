import { useState, useEffect, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { ScrollControls, Scroll } from "@react-three/drei";
import Interface from "./components/Interface";
import ScrollManager from "./components/ScrollManager"
import Menu from './components/Menu';
import { MotionConfig } from 'framer-motion';
import { Leva } from "leva";
import { framerMotionConfig } from './config';
import LoadingScreen
  from './components/LoadingScreen';
function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false);


  // useEffect rather then onClick so menu closes when scrolling
  useEffect(() => {
    setMenuOpened(false);
  }, [section])

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <MotionConfig transition={{
        ...framerMotionConfig
      }}>
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          <color attach="background" args={["#e6e7ff"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Suspense>
                { started && (
                <Experience section={section} menuOpened={menuOpened} />
                )}
              </Suspense>
            </Scroll>
            <Scroll html>
              {started && <Interface setSection={setSection} />}
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu onSectionChange={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
      </MotionConfig>
      <Leva hidden />
    </>
  );
}

export default App;
