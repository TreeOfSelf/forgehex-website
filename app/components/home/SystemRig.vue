<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos';
import * as THREE from 'three';
import { watch, ref, onMounted } from 'vue';

const { state } = useGLTF('/models/computer.glb');

const rustColor = ref('');
const glowColor = ref('');
const voidColor = ref('');

onMounted(() => {
  const styles = getComputedStyle(document.documentElement);
  rustColor.value = styles.getPropertyValue('--color-rust').trim();
  glowColor.value = styles.getPropertyValue('--color-glow').trim();
  voidColor.value = styles.getPropertyValue('--color-void').trim();
});

const matDark = new THREE.MeshStandardMaterial({
  color: voidColor.value || '#111111',
  roughness: 0.8,
  metalness: 0.2,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
});

const lineSettings = {
  depthTest: true,
  depthWrite: false,
  transparent: true,
};

let matLineOrange: THREE.LineBasicMaterial;
let matLinePurple: THREE.LineBasicMaterial;

watch(
  [rustColor, glowColor, voidColor],
  ([rust, glow, void_]) => {
    if (rust && glow && void_) {
      matLineOrange = new THREE.LineBasicMaterial({
        color: rust,
        ...lineSettings,
      });

      matLinePurple = new THREE.LineBasicMaterial({
        color: glow,
        ...lineSettings,
      });

      matDark.color.set(void_);
    }
  },
  { immediate: true },
);

watch(state, (gltf) => {
  if (gltf && gltf.scene && matLineOrange && matLinePurple) {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = matDark;

        if (child.name === 'Rig_Glow') {
          if (!child.getObjectByName('PurpleLines')) {
            const edges = new THREE.EdgesGeometry(child.geometry, 15);
            const line = new THREE.LineSegments(edges, matLinePurple);
            line.renderOrder = 1;
            line.name = 'PurpleLines';
            child.add(line);
          }
        } else if (child.name === 'Rig_Rust') {
          if (!child.getObjectByName('CyberLines')) {
            const edges = new THREE.EdgesGeometry(child.geometry, 15);
            const line = new THREE.LineSegments(edges, matLineOrange);
            line.renderOrder = 1;
            line.name = 'CyberLines';
            child.add(line);
          }
        }
      }
    });
  }
});
</script>

<template>
  <TresGroup :position="[0, -1.5, 0]">
    <primitive v-if="state" :object="state.scene" />
  </TresGroup>
</template>
