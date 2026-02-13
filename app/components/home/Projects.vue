<script setup lang="ts">
const projects = [
  {
    title: 'UCC.org Global Navigation',
    desc: 'Engineered the responsive navigation for a high-traffic, information-dense, 3-letter enterprise domain. Translated Figma designs into a WordPress environment.',
    image: '/images/projects/ucc-preview.png',
    link: 'https://ucc.org',
    stack: [
      { name: 'WordPress', icon: 'mdi:wordpress' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'Figma', icon: 'logos:figma' },
      { name: 'a11y', icon: 'material-symbols-light:accessibility-new' },
    ],
  },
  {
    title: 'Hardcore Anarchy',
    desc: 'A complex Next.js web application featuring real-time server statistics and a live 3D render of the world. Wrapped in a hand-crafted Windows 98 retro UI.',
    image: '/images/projects/anarchy-preview.png',
    link: 'https://hardcoreanarchy.gay',
    stack: [
      { name: 'Next.js', icon: 'logos:nextjs-icon' },
      { name: 'WebGL', icon: 'ph:cube-bold' },
      { name: 'Live Data', icon: 'material-symbols-light:data-usage' },
    ],
  },
  {
    title: 'Rustborn Bastards',
    desc: "A atmospheric web experience built to drive a successfully funded Kickstarter campaign. Features design built from the project's artwork and live funding statistics.",
    image: '/images/projects/rustborn-preview.png',
    link: 'https://rustbornbastards.com',
    stack: [
      { name: 'Nuxt', icon: 'logos:nuxt-icon' },
      { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
      { name: 'Kickstarter API', icon: 'simple-icons:kickstarter' },
    ],
  },
  {
    title: 'Studio Gritdark',
    desc: 'A unique digital storefront for a TTRPG company. Features seamless third-party API integration with itch.io, Fourthwall, and a bespoke Discord bot.',
    image: '/images/projects/gritdark-preview.png',
    link: 'https://gritdark.com',
    stack: [
      { name: 'Nuxt', icon: 'logos:nuxt-icon' },
      { name: 'itch.io', icon: 'simple-icons:itchdotio' },
      { name: 'Fourthwall', icon: 'custom-icons:fourthwall' },
      { name: 'Discord Bot', icon: 'logos:discord-icon' },
    ],
  },
];
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-24">
    <div class="mb-12 flex items-center justify-between">
      <NuxtLink to="/projects" class="group flex items-center gap-4">
        <h2
          class="font-heading text-main group-hover:text-glow text-5xl font-bold transition-colors duration-300"
        >
          Projects
        </h2>
        <Icon
          name="lucide:arrow-right"
          class="text-rust group-hover:text-glow h-6! w-6! transition-transform duration-300 ease-in-out group-hover:translate-x-2"
        />
      </NuxtLink>

      <NuxtLink
        to="/projects"
        class="text-mute hover:text-glow hidden text-sm font-medium tracking-widest uppercase transition-colors duration-300 md:block"
      >
        View All
      </NuxtLink>
    </div>

    <div class="grid gap-8 md:grid-cols-2">
      <HomeProjectCard v-for="project in projects" :key="project.title" :project="project" />
    </div>
  </section>
</template>
