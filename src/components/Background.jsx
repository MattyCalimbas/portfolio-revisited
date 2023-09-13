import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
    const material = useRef()
    const color = useRef({
        color: "#6b395c",
      });
      const data = useScroll();
      const tl = useRef();

      useFrame(() => {
        tl.current.progress(data.scroll.current);
        material.current.color = new THREE.Color(color.current.color);
      });
    

      useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.to(color.current, {
          color: "#212121",
        });
        tl.current.to(color.current, {
          color: "#7a7ca5",
        });
        tl.current.to(color.current, {
          color: "#395C6B",
        });
      }, []);

    return (
        <group>
            <Sphere scale={[30, 30, 30]}>
                <meshBasicMaterial
                    ref={material}
                    side={THREE.BackSide}
                    toneMapped={false}
                />
            </Sphere>
        </group>
    );

}