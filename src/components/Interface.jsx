import { motion } from "framer-motion";

import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { useForm, ValidationError } from '@formspree/react';


const skills = [
    {
        title: "HTML5",
        level: 95
    },
    {
        title: "CSS3",
        level: 94
    },
    {
        title: "JavaScript",
        level: 90
    },
    {
        title: "React.js",
        level: 85
    },
    {
        title: "Node.js",
        level: 90
    },
]

const tools = [
    {
        title: "VSCode",
        level: 100
    },
    {
        title: "Figma",
        level: 85
    },
    {
        title: "Photoshop",
        level: 80
    },


]

function Section(props) {
    const { children, mobileTop } = props;

    return (
        <motion.section
            className={
                `h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start ${mobileTop ? "justify-start md:justify-center" : "justify-center"}`
            }
            initial={{
                opacity: 0,
                y: 50
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.6
                }
            }}>
            {children}
        </motion.section>
    )
}

function AboutSection(props) {
    const { setSection } = props;
    return (
        <Section mobileTop>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0">
                Hello, I'm
                <br />
                <span className="bg-white px-1 italic">Matthew Calimbas</span>
                <motion.p className="text-lg mt-4"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 1.5
                    }}>
                    <span className="md:text-2xl">WEB DEVELOPER</span>
                    <br />
                    ...I make web applications!
                </motion.p>
                <motion.button onClick={() => setSection(3)} className="bg-cyan-950 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16"
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        delay: 2.5
                    }}>
                    Contact me
                </motion.button>
            </h1>
        </Section>
    )
}


function SkillSection() {
    return (
        <Section>
            <motion.div className="w-full" whileInView={"visible"}>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
                <div className=" mt-8 space-y-4">
                    {skills.map((skill, index) => (
                        <div className="w-full md:w-64" key={index}>
                            <motion.h3
                                className="text-lg md:text-xl font-bold text-gray-100"
                                initial={{
                                    opacity: 0,
                                }}
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            duration: 1,
                                            delay: 1 + index * 0.2,
                                        },
                                    },
                                }}
                            >
                                {skill.title}
                            </motion.h3>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div
                                    className="h-full bg-cyan-900 rounded-full "
                                    style={{ width: `${skill.level}%` }}
                                    initial={{
                                        scaleX: 0,
                                        originX: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            scaleX: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 1 + index * 0.2,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mt-10">Tools</h2>
                    <div className=" mt-8 space-y-4">
                        {tools.map((tool, index) => (
                            <div className="w-full md:w-64" key={index}>
                                <motion.h3
                                    className="text-lg md:text-xl font-bold text-gray-100"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 2 + index * 0.2,
                                            },
                                        },
                                    }}
                                >
                                    {tool.title}
                                </motion.h3>
                                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                    <motion.div
                                        className="h-full bg-cyan-900 rounded-full "
                                        style={{ width: `${tool.level}%` }}
                                        initial={{
                                            scaleX: 0,
                                            originX: 0,
                                        }}
                                        variants={{
                                            visible: {
                                                scaleX: 1,
                                                transition: {
                                                    duration: 1,
                                                    delay: 2 + index * 0.2,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    )
}

function ContactSection() {
    const [state, handleSubmit] = useForm("mzblvdvw");
    return (
        <Section>
            <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
            <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">

                {state.succeeded ? (
                    <p className="text-gray-900 text-center">Thanks for your message</p>
                ) : (
                <form onSubmit={handleSubmit}>
                    <label for="name" className="font-medium text-gray-900 block mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 p-3"
                    />
                    <label
                        for="email"
                        className="font-medium text-gray-900 block mb-1 mt-8"
                    >
                        Email
                    </label>
                    <ValidationError className="mt-1 text-red-500" errors={state.errors} />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 p-3"
                    />
                    <label
                        for="email"
                        className="font-medium text-gray-900 block mb-1 mt-8"
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 p-3"
                    />
                    <ValidationError className="mt-1 text-red-500" errors={state.errors} />
                    <button disabled={state.submitting} className="bg-cyan-900 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 ">
                        Submit
                    </button>
                </form>
                )}

            </div>
        </Section>
    )
}

function ProjectsSection() {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

    const nextProject = () => {
        setCurrentProject((currentProject + 1) % projects.length);
    };

    const previousProject = () => {
        setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    };

    return (
        <Section>
            <div className="flex w-full h-full gap-8 items-center justify-center">
                <button
                    className="hover:text-cyan-900 transition-colors mt-8"
                    onClick={previousProject}
                >
                    ← Previous
                </button>
                <h2 className="text-3xl md:text-5xl font-bold mt-8">Projects</h2>
                <button
                    className="hover:text-cyan-900 transition-colors mt-8"
                    onClick={nextProject}
                >
                    Next →
                </button>
            </div>
        </Section>
    );
};

export default function Interface(props) {
    const { setSection } = props;
    return (
        <div className='flex flex-col items-center w-screen'>
            <AboutSection setSection={setSection} />
            <SkillSection />
            <ProjectsSection />
            <ContactSection />
        </div>
    )
}


