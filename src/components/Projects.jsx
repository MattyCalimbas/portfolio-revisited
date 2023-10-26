import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
export const projects = [
    {
        title: "Case Study 88",
        url: "https://mattycalimbas.github.io/case-study-88/index.html",
        image: "projects/demoImg1.png",
        description: "WordPress static website proposal created to showcase and present a front-end facelift for a design firm. The website has been built using the Blocksy theme, Elementor and AI imagery via Midjourney, providing a visually appealing and interactive presentation of the proposed changes.",
    },
    {
        title: "Shrink Boxing",
        url: "https://mattycalimbas.github.io/fatboyshrinkboxing/",
        image: "projects/boxingProject.jpg",
        description: "An extensively developed website constructed using only HTML and CSS. To enhance its design and layout, CSS frameworks like Bootstrap were employed. This project was conceived as a proof of concept to demonstrate the potential for a frontend makeover to a client.",
    },
    {
        title: "Gogopix API",
        url: "https://github.com/MattyCalimbas/gogopixApi",
        image: "projects/apithumb.png",
        description: "This is an API that I designed, tested and implemented for the GOGOPIX mobile application. Using Amazon's Web Services (AWS) enviroment this API is deployed on an Amazon EC2 instance and does a GET request to an AWS provisioned PostgreSQL database.",
    },
    {
        title: "Beer Selector",
        url: "https://beerselector-production.up.railway.app/",
        image: "projects/beerthumb.png",
        description: "This is a personal portfolio project that is still a WIP. This is a near-fully functioning web application that helps a user select beer given personal taste. This web application employs Express and Angular 7 to parse the Punk API database for beers. All data is displayed within a single HTML page.",
    },
    {
        title: "Gogopix",
        url: "https://gogopix.co/",
        image: "projects/gogopixapp.png",
        description: "GOGOPIX, an Android app, is a promotional platform and marketplace for music-related digital art and artists. As a product manager, I bridged communication between teams, ensuring adherence to timelines and pop culture relevance in product roadmaps. Our joint efforts resulted in a visually appealing, highly promotable app.",
    },
];

function Project(props) {
    const { project, highlighted } = props;

    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 0.7 : 0.4)
    }, [highlighted]);

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    })

    return (
        <group {...props}>
            <mesh position-z={-0.001} onClick={() => window.open(project.url, "_blank")} ref={background}>
                <planeGeometry args={[2.2, 3]} />
                <meshBasicMaterial color="black" transparent opacity={0.4} />
            </mesh>
            <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.75} />
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.2} position={[-1, -0.01, 0]}>
                {project.title.toUpperCase()}
            </Text>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.1} position={[-1, -0.3, 0]}>
                {project.description}
            </Text>
        </group>
    )
}

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export default function Projects() {

    const { viewport } = useThree()
    const [currentProject] = useAtom(currentProjectAtom);

    return (
        <group position-y={-viewport.height * 2 + 1}>
            {
                projects.map((project, index) => (
                    <motion.group
                        key={"project_" + index}
                        position={[index * 2.5, 0, -3]}
                        animate={{
                            x: 0 + (index - currentProject) * 2.5,
                            y: currentProject === index ? 0 : -0.1,
                            z: currentProject === index ? -2 : -3,
                            rotateX: currentProject === index ? 0 : -Math.PI / 3,
                            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
                        }}>
                        <Project project={project} highlighted={index === currentProject} />
                    </motion.group>
                ))
            }
        </group>
    )
}