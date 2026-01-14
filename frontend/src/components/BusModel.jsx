import React, { useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThree } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const BusModel = (props) => {
    const { scene } = useGLTF('/bus.glb');
    const busRef = useRef();

    // Clean up previous triggers on unmount to avoid duplicates
    useLayoutEffect(() => {
        if (!busRef.current) return;

        // Initial State
        busRef.current.position.set(0, -1, 0);
        busRef.current.rotation.set(0, Math.PI / 4, 0);
        busRef.current.scale.set(1.5, 1.5, 1.5); // SCALE UP THE BUS

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#scroll-container", // We will create this ID in Home.jsx
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Smooth scrubbing
                // markers: true, // Debug markers
            }
        });

        // Animation Sequence
        // 1. Move bus down and rotate side
        tl.to(busRef.current.position, {
            y: -1.5,
            z: 2,
            duration: 2
        })
            .to(busRef.current.rotation, {
                y: -Math.PI / 4,
                duration: 2
            }, "<") // Run concurrently

            // 2. Rotate to show interior/other side
            .to(busRef.current.rotation, {
                y: -Math.PI,
                duration: 3
            })
            .to(busRef.current.position, {
                z: 5, // Move closer
                duration: 3
            }, "<")

            // 3. Drive away / Exit
            .to(busRef.current.position, {
                z: 15,
                y: -5,
                duration: 2
            });

        return () => {
            // Cleanup triggers
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return <primitive object={scene} ref={busRef} {...props} scale={[1, 1, 1]} />;
};

export default BusModel;
