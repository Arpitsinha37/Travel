import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import BusModel from './BusModel';

const Scene = () => {
    return (
        <Canvas
            shadows
            camera={{ position: [5, 2, 10], fov: 45 }}
            gl={{ antialias: true }}
            className="webgl"
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
        >
            <ambientLight intensity={1} />

            <Suspense fallback={null}>
                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#000000" />

                <BusModel />

                <directionalLight position={[5, 10, 5]} intensity={2} castShadow shadow-mapSize={1024} />
            </Suspense>
        </Canvas>
    );
};

export default Scene;
