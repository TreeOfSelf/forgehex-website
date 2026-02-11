<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { NoToneMapping } from 'three';

const mounted = ref(false);
const animationStarted = ref(false);
const rustColor = ref('#F39658');
const glowColor = ref('#a3a3ff');
const canvasWidth = ref(700);
const canvasHeight = ref(700);
const modelScale = ref(60);
const cameraTarget = [-1, -0, 1];

const cameraLeft = computed(() => -canvasWidth.value / 2);
const cameraRight = computed(() => canvasWidth.value / 2);
const cameraTop = computed(() => canvasHeight.value / 2);
const cameraBottom = computed(() => -canvasHeight.value / 2);

onMounted(() => {
  mounted.value = true;
  const styles = getComputedStyle(document.documentElement);
  const cssRust = styles.getPropertyValue('--color-rust').trim();
  const cssGlow = styles.getPropertyValue('--color-glow').trim();
  if (cssRust) rustColor.value = cssRust;
  if (cssGlow) glowColor.value = cssGlow;

  setTimeout(() => {
    animationStarted.value = true;
  }, 100);
});

const gl = {
  toneMapping: NoToneMapping,
  alpha: true,
  antialias: true,
};
</script>

<template>
  <div
    class="from-plate relative mx-50 flex h-120 items-center justify-between gap-24 rounded-t-3xl bg-linear-to-b to-transparent p-10"
  >
    <div class="z-10 flex w-300 flex-col items-start select-none">
      <h2 class="font-heading text-main mb-5 ml-2 inline-block text-7xl font-bold tracking-wide">
        Powered By
      </h2>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 3643 702"
        class="hero-logo h-auto w-full"
        :class="{ animate: animationStarted }"
      >
        <defs>
          <linearGradient
            id="rustToGlow"
            x1="0"
            y1="0"
            x2="3643"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stop-color="var(--color-rust)" stop-opacity="1" />
            <stop offset="100%" stop-color="var(--color-glow)" stop-opacity="1" />
          </linearGradient>
        </defs>
        <g id="g1" transform="translate(-19 -40)">
          <path
            class="logo-anvil"
            fill="url(#rustToGlow)"
            d="M244 506c0-14 0-14 16-22 36-18 49-29 51-46 5-33-5-58-24-59-5 0-21-3-34-7-50-15-88-38-100-61-6-13-12-12 66-12 69 0 69 0 69-5 1-8 284-7 284 2 1 21-1 25-24 32-46 14-102 50-113 73-17 36-6 58 44 83l16 9-1 14c0 14-45 21-64 9-30-19-90-19-123 0-20 13-63 6-63-10z"
          />
          <path
            class="logo-cog"
            fill="url(#rustToGlow)"
            d="M333 741c-36-2-47-4-49-10l-19-58-12-5c-29-11-60-29-88-51-9-7-9-7-35 0-29 9-33 9-38 5-14-13-49-68-65-101-12-24-11-25 2-36l32-27c2-1 2-1 0-16a274 274 0 0 1 14-152c0-2-4-7-16-22-17-23-17-23-17-27 0-10 41-66 71-96 13-14 12-14 32-8 46 15 41 14 51 8 18-12 42-24 67-33 14-5 14-5 23-34 9-32 10-33 14-35 8-4 113-5 122 0 4 2 6 6 13 31l9 29c1 4 2 4 15 9 25 9 39 16 61 29 17 10 15 10 32 4 46-14 43-14 54-4 21 20 66 78 73 95 3 7 3 7-25 43l-7 10 6 16c15 42 18 92 9 139-3 13-3 12 6 20l35 30c5 10-29 72-63 117-14 17-10 16-45 7-28-8-28-8-40 1-28 22-63 41-91 50-7 2-7 2-15 30-9 30-10 34-14 37-5 3-71 6-102 5zm68-100c212-33 296-279 147-427a264 264 0 0 0-441 118C63 505 221 671 401 641Z"
          />
          <path
            class="logo-text"
            fill="url(#rustToGlow)"
            d="M1149 224H947v116h157v60H947v184h-67V164h269zm350 211c0 23-4 44-12 63a140 140 0 0 1-81 82c-20 8-41 12-65 12a166 166 0 0 1-114-44 153 153 0 0 1-43-113c0-23 4-44 11-64a141 141 0 0 1 82-83 187 187 0 0 1 129 1 138 138 0 0 1 81 82c8 20 12 41 12 64zm-67 0c0-14-2-27-6-39a85 85 0 0 0-85-59 90 90 0 0 0-66 28c-8 9-14 19-18 31a119 119 0 0 0 0 77c4 12 10 22 18 31a92 92 0 0 0 104 20 83 83 0 0 0 47-51c4-11 6-24 6-38zm412-80a115 115 0 0 0-53-12c-15 0-29 3-42 7a90 90 0 0 0-56 53c-5 13-8 29-8 47v74h68v60h-202v-60h68V344h-68v-60h134v75c11-30 28-51 49-63a150 150 0 0 1 105-16c10 2 20 5 30 10zm351 226c0 21-3 39-10 55s-17 30-30 41-28 20-45 26-37 9-58 9c-52 0-97-16-134-48l32-51c31 26 65 39 102 39 23 0 42-5 55-17 15-11 22-29 22-53v-32c-14 12-27 21-40 27a125 125 0 0 1-141-37 165 165 0 0 1-38-109c0-21 4-41 10-60 7-19 17-35 28-49a131 131 0 0 1 97-45c17 0 32 3 45 9 13 5 26 14 39 25v-27h66zm-66-217a101 101 0 0 0-68-27c-25 0-45 9-61 26a98 98 0 0 0-23 68 96 96 0 0 0 24 67c7 8 16 15 26 20 11 5 22 7 34 7s24-2 37-7 23-12 31-21zm203 96c4 20 13 37 30 51 16 14 38 21 66 21a136 136 0 0 0 98-37l34 46c-19 20-40 33-61 40-22 7-45 11-71 11a175 175 0 0 1-117-44 153 153 0 0 1-46-113c0-23 3-44 11-63a144 144 0 0 1 82-83c19-8 41-12 64-12 25 0 47 4 66 13a141 141 0 0 1 84 93c8 23 12 48 12 77zm177-59c-4-19-14-35-30-46a95 95 0 0 0-57-18c-21 0-40 6-56 18a69 69 0 0 0-31 46zm407 183h-67V400h-135v184h-67V164h67v176h135V164h67zm137-124c3 20 13 37 29 51 17 14 39 21 66 21 22 0 41-4 57-10 16-7 30-16 41-28l35 47c-20 20-40 33-62 40-21 7-45 11-71 11a169 169 0 0 1-116-44 153 153 0 0 1-47-113c0-23 4-44 11-63a144 144 0 0 1 82-83c20-8 41-12 65-12a159 159 0 0 1 116 48c14 16 26 35 33 58 8 23 12 48 12 77zm176-59c-3-19-13-35-30-46a95 95 0 0 0-56-18c-21 0-40 6-57 18a69 69 0 0 0-30 46zm430 183h-142v-60h26l-41-62-40 62h24v60h-141v-60h44l67-92-64-88h-40v-60h135v60h-21l36 58 37-58h-24v-60h137v60h-39l-64 88 67 92h43z"
            aria-label="ForgeHex"
          />
        </g>
      </svg>

      <h3 class="text-mute font-heading tagline mt-5 block self-end text-xl">
        Fullstack Development. Built Properly.
      </h3>
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

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .hero-logo .logo-anvil,
  .hero-logo .logo-cog,
  .hero-logo .logo-text {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

.hero-logo .logo-anvil,
.hero-logo .logo-cog,
.hero-logo .logo-text {
  opacity: 0;
}

.hero-logo .logo-cog {
  transform-origin: center;
  transform-box: fill-box;
}

.hero-logo.animate .logo-anvil {
  animation: fade-in 0.5s ease-out forwards;
}

.tagline {
  opacity: 0;
  animation: fade-in 0.5s ease 2s forwards;
}

.hero-logo.animate .logo-cog {
  animation:
    fade-in 0.3s ease-out forwards,
    spin-cog 0.8s cubic-bezier(0.2, 0, 0, 1) 1s forwards;
}

.hero-logo.animate .logo-text {
  animation: slide-from-behind 0.6s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes spin-cog {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes slide-from-behind {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
