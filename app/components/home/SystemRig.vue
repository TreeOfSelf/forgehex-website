<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos';
import { useLoop } from '@tresjs/core';
import * as THREE from 'three';
import { watch, ref, onMounted, onUnmounted, shallowRef } from 'vue';

const RUST_LINE_STAGGER = 0.005;
const GLOW_LINE_STAGGER = 0.002;
const LINE_DURATION = 1.0;
const GROUP_SCALE_DURATION = 1;

const { state } = useGLTF('/models/computer.glb');

const groupRef = shallowRef<THREE.Group | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);

const animatedLines = ref<
  Array<{
    line: THREE.Line;
    delay: number;
  }>
>([]);

const animationStartTime = ref<number | null>(null);
const groupAnimating = ref(false);
const hasAnimated = ref(false);

const updateMouse = (event: MouseEvent) => {
  mouseX.value = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY.value = (event.clientY / window.innerHeight) * 2 - 1;
};

const rustColor = ref('');
const glowColor = ref('');
const voidColor = ref('');

onMounted(() => {
  window.addEventListener('mousemove', updateMouse);
  const styles = getComputedStyle(document.documentElement);
  rustColor.value = styles.getPropertyValue('--color-rust').trim();
  glowColor.value = styles.getPropertyValue('--color-glow').trim();
  voidColor.value = styles.getPropertyValue('--color-void').trim();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse);
});

const matDark = new THREE.MeshStandardMaterial({
  color: voidColor.value || '#111111',
  roughness: 0.8,
  metalness: 0.2,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
  transparent: true,
  opacity: 1,
});

const lineSettings = {
  depthTest: true,
  depthWrite: false,
  transparent: true,
  opacity: 0,
  linewidth: 2,
};

let matLineOrange: THREE.LineBasicMaterial;
let matLinePurple: THREE.LineBasicMaterial;

watch(
  [rustColor, glowColor, voidColor],
  ([rust, glow, void_]) => {
    if (rust && glow && void_) {
      matLineOrange = new THREE.LineBasicMaterial({ color: rust, ...lineSettings });
      matLinePurple = new THREE.LineBasicMaterial({ color: glow, ...lineSettings });
      matDark.color.set(void_);
    }
  },
  { immediate: true },
);

const { onBeforeRender } = useLoop();

onBeforeRender(({ delta }) => {
  if (groupRef.value) {
    const targetY = mouseX.value * 0.25;
    const targetX = mouseY.value * 0.1;
    groupRef.value.rotation.y += (targetY - groupRef.value.rotation.y) * 3 * delta;
    groupRef.value.rotation.x += (targetX - groupRef.value.rotation.x) * 3 * delta;
  }

  if (animationStartTime.value === null) return;

  const elapsed = (performance.now() - animationStartTime.value) / 1000;

  if (groupAnimating.value && groupRef.value) {
    const progress = Math.min(elapsed / GROUP_SCALE_DURATION, 1);
    const ease = 1 - Math.pow(1 - progress, 2);
    groupRef.value.scale.set(ease, ease, ease);

    if (progress >= 1) {
      groupAnimating.value = false;
      groupRef.value.scale.set(1, 1, 1);
    }
  }

  animatedLines.value.forEach(({ line, delay }) => {
    if (elapsed < delay) return;

    const animTime = elapsed - delay;

    if (animTime >= LINE_DURATION) {
      (line.material as THREE.LineBasicMaterial).opacity = 1;
      return;
    }

    const progress = animTime / LINE_DURATION;
    const ease = 1 - Math.pow(1 - progress, 2);
    (line.material as THREE.LineBasicMaterial).opacity = ease;
  });
});

watch(state, (gltf) => {
  if (
    gltf &&
    gltf.scene &&
    matLineOrange &&
    matLinePurple &&
    groupRef.value &&
    !hasAnimated.value
  ) {
    hasAnimated.value = true;

    animatedLines.value = [];
    animationStartTime.value = performance.now();
    groupAnimating.value = true;
    groupRef.value.scale.set(0, 0, 0);

    let rustDelay = 0;
    let glowDelay = 0;

    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        mesh.material = matDark.clone();

        const isGlow = mesh.name === 'Rig_Glow';
        const isRust = mesh.name === 'Rig_Rust';

        if (isGlow || isRust) {
          const edges = new THREE.EdgesGeometry(mesh.geometry, 15);
          const positions = edges.attributes.position;

          if (positions) {
            for (let i = 0; i < positions.count; i += 2) {
              const start = new THREE.Vector3(
                positions.getX(i),
                positions.getY(i),
                positions.getZ(i),
              );
              const end = new THREE.Vector3(
                positions.getX(i + 1),
                positions.getY(i + 1),
                positions.getZ(i + 1),
              );

              const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
              const lineMat = (isGlow ? matLinePurple : matLineOrange).clone();
              const line = new THREE.Line(lineGeometry, lineMat);

              line.renderOrder = isGlow ? 2 : 1;
              mesh.add(line);

              const delay = isGlow ? glowDelay : rustDelay;
              animatedLines.value.push({ line, delay });

              if (isGlow) {
                glowDelay += GLOW_LINE_STAGGER;
              } else {
                rustDelay += RUST_LINE_STAGGER;
              }
            }
          }
        }
      }
    });
  }
});
</script>

<template>
  <TresGroup ref="groupRef" :position="[0, -1.5, 0]">
    <primitive v-if="state" :object="state.scene" />
  </TresGroup>
</template>
