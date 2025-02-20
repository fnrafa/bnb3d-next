import React, {useRef, useEffect} from "react";
import * as THREE from "three";
import {GLTFLoader} from "three-stdlib";
import {OrbitControls} from "three-stdlib";

type ModelViewerProps = {
    modelUrl?: string;
};

const MeshViewer: React.FC<ModelViewerProps> = ({modelUrl}) => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaaaaa);

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        currentMount.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        controls.enablePan = true;
        controls.enableZoom = true;

        if (modelUrl) {
            const loader = new GLTFLoader();
            loader.load(
                modelUrl,
                (gltf) => {
                    gltf.scene.position.set(0, 0, 0);
                    scene.add(gltf.scene);
                },
                undefined,
                (error) => {
                    console.error("Error loading model:", error);
                }
            );
        }

        const handleResize = () => {
            const newWidth = currentMount.clientWidth;
            const newHeight = currentMount.clientHeight;
            renderer.setSize(newWidth, newHeight);
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            currentMount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [modelUrl]);

    return <div ref={mountRef} className="w-full h-full max-h-[70vh]"/>;
};

export default MeshViewer;
