import { useEffect, useRef, useState } from "react";
import { useMotionExperience } from "@/hooks/use-motion-experience";

/** Independent paths converge into one operating system. */
export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const { staticMotion } = useMotionExperience();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    void import("three")
      .then((THREE) => {
        if (disposed) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        element.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
        camera.position.set(0, 0, 10);
        const assembly = new THREE.Group();
        scene.add(assembly);
        const geometry = new THREE.TorusKnotGeometry(1.28, 0.32, 220, 20, 2, 3);
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x2dcddd,
          metalness: 0.78,
          roughness: 0.24,
          clearcoat: 1,
          emissive: 0x073b43,
          emissiveIntensity: 0.6,
        });
        const core = new THREE.Mesh(geometry, material);
        assembly.add(core);
        const latticeGeometry = new THREE.TorusKnotGeometry(1.29, 0.345, 100, 10, 2, 3);
        const latticeMaterial = new THREE.MeshBasicMaterial({
          color: 0x8df5f4,
          wireframe: true,
          transparent: true,
          opacity: 0.13,
        });
        assembly.add(new THREE.Mesh(latticeGeometry, latticeMaterial));
        const ringGeometry = new THREE.TorusGeometry(2.22, 0.009, 6, 160);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x48cddd,
          transparent: true,
          opacity: 0.35,
        });
        const rings = [0, 1, 2].map((index) => {
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.set(0.6 + index * 0.68, index * 0.85, index * 0.42);
          assembly.add(ring);
          return ring;
        });
        const dotGeometry = new THREE.SphereGeometry(0.045, 12, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xc8f96a });
        const dots = rings.map(() => {
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          assembly.add(dot);
          return dot;
        });
        scene.add(new THREE.AmbientLight(0xaadce2, 2));
        const key = new THREE.DirectionalLight(0xbcffff, 7);
        key.position.set(3, 4, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0x35aaff, 5);
        rim.position.set(-4, -2, 1);
        scene.add(rim);
        const warm = new THREE.DirectionalLight(0xeaffad, 3);
        warm.position.set(0, 3, -4);
        scene.add(warm);
        let frame = 0;
        let visible = true;
        let time = 0;
        let last = 0;
        const pointer = { x: 0, y: 0 };
        const position = new THREE.Vector3();
        const render = () => {
          assembly.rotation.z = Math.sin(time * 0.17) * 0.12;
          assembly.rotation.y += (pointer.x * 0.22 + time * 0.12 - assembly.rotation.y) * 0.045;
          assembly.rotation.x += (pointer.y * 0.16 + 0.22 - assembly.rotation.x) * 0.045;
          assembly.position.y = staticMotion ? 0 : Math.sin(time * 0.7) * 0.09;
          dots.forEach((dot, index) => {
            const angle = time * (0.25 + index * 0.12) + index * 2;
            position
              .set(Math.cos(angle) * 2.22, Math.sin(angle) * 2.22, 0)
              .applyEuler(rings[index].rotation);
            dot.position.copy(position);
          });
          renderer.render(scene, camera);
        };
        const tick = (now: number) => {
          if (!visible || document.hidden || disposed || staticMotion) {
            frame = 0;
            return;
          }
          time += last ? Math.min((now - last) / 1000, 0.05) : 0.016;
          last = now;
          render();
          frame = requestAnimationFrame(tick);
        };
        const sync = () => {
          if (visible && !document.hidden && !staticMotion && !frame) {
            last = 0;
            frame = requestAnimationFrame(tick);
          } else if ((!visible || document.hidden) && frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        };
        const resize = new ResizeObserver(() => {
          const { width, height } = element.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          render();
        });
        resize.observe(element);
        const observer = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            sync();
          },
          { rootMargin: "60px" },
        );
        observer.observe(element);
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || staticMotion) return;
          const rect = element.getBoundingClientRect();
          pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        };
        const leave = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        const lost = (event: Event) => {
          event.preventDefault();
          setReady(false);
          visible = false;
          sync();
        };
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        renderer.domElement.addEventListener("webglcontextlost", lost);
        document.addEventListener("visibilitychange", sync);
        render();
        setReady(true);
        sync();
        cleanup = () => {
          cancelAnimationFrame(frame);
          resize.disconnect();
          observer.disconnect();
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          document.removeEventListener("visibilitychange", sync);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          [
            geometry,
            latticeGeometry,
            ringGeometry,
            dotGeometry,
            material,
            latticeMaterial,
            ringMaterial,
            dotMaterial,
          ].forEach((resource) => resource.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => setReady(false));
    return () => {
      disposed = true;
      cleanup();
    };
  }, [staticMotion]);
  return (
    <div className="engine-scene" aria-hidden="true">
      <div className="engine-orbit engine-orbit-a" />
      <div className="engine-orbit engine-orbit-b" />
      <div className={`engine-fallback ${ready ? "is-ready" : ""}`}>
        <span />
        <span />
        <span />
      </div>
      <div className="engine-canvas" ref={host} />
      <div className="engine-label engine-label-top">
        <span /> Software que conecta.
      </div>
      <div className="engine-label engine-label-bottom">
        Ideia <span>→</span> Sistema <span>→</span> Impacto
      </div>
      <span className="engine-coordinate">BM / ENGINEERING</span>
    </div>
  );
}
