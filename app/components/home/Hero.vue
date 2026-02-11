<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { NoToneMapping } from 'three';

import Logo from '~/assets/svg/forgehexlogo.svg';

const mounted = ref(false);
const rustColor = ref('#F39658');

const canvasWidth = ref(600);
const canvasHeight = ref(700);
const modelScale = ref(70);

const cameraTarget = [-1, -0.5, 1];

const cameraLeft = computed(() => -canvasWidth.value / 2);
const cameraRight = computed(() => canvasWidth.value / 2);
const cameraTop = computed(() => canvasHeight.value / 2);
const cameraBottom = computed(() => -canvasHeight.value / 2);

onMounted(() => {
  mounted.value = true;
  const styles = getComputedStyle(document.documentElement);
  const cssRust = styles.getPropertyValue('--color-rust').trim();
  if (cssRust) rustColor.value = cssRust;
});

const gl = {
  toneMapping: NoToneMapping,
  alpha: true,
  antialias: true,
};
</script>

<template>
  <div class="relative flex h-100 w-full items-center justify-center gap-16">
    <div class="z-10 flex flex-col items-center select-none">
      <h2
        class="font-heading from-rust to-glow mb-4 inline-block bg-linear-to-r bg-clip-text pb-2 text-6xl font-bold tracking-wide text-transparent"
      >
        Build With
      </h2>

      <div class="forgehex-badge w-120 flex-none">
        <Logo class="text-rust hover:text-glow h-auto w-full transition-colors" />
      </div>
    </div>

    <div
      class="pointer-events-none relative shrink-0"
      :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }"
    >
      <ClientOnly>
        <TresCanvas v-if="mounted" v-bind="gl" clear-color="#00000000">
          <TresOrthographicCamera
            :position="[20, 15, 20]"
            :look-at="cameraTarget"
            :left="cameraLeft"
            :right="cameraRight"
            :top="cameraTop"
            :bottom="cameraBottom"
            :zoom="modelScale"
          />

          <TresAmbientLight :intensity="0.5" />
          <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" />
          <TresSpotLight :position="[-5, 5, 0]" :intensity="10" :color="rustColor" />

          <Suspense>
            <HomeSystemRig />
          </Suspense>
        </TresCanvas>
      </ClientOnly>
    </div>
  </div>
</template>
