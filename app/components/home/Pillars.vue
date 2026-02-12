<script setup lang="ts">
const pillars = [
  {
    title: 'Hand-Crafted Code',
    icon: 'temaki:anvil-and-hammer',
    desc: 'Your idea has soul, and your code should reflect that. No generic templates or shortcuts. Just clean, custom-built solutions.',
  },
  {
    title: 'Top Performance',
    icon: 'bi:lightning-charge-fill',
    desc: 'Built for speed and long-term reliability. Optimized from the ground up to load fast, scale smoothly, and meet modern accessibility standards.',
  },
  {
    title: 'Transparent Value',
    icon: 'fa6-solid:handshake',
    desc: 'Expert engineering with straightforward, flat-rate pricing. Everything is handled for you: development, testing, and final deployment',
  },
];
</script>

<template>
  <section class="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-24">
    <h2 class="font-heading text-main mb-10 text-6xl">Why ForgeHex?</h2>

    <div class="grid gap-8 md:grid-cols-3">
      <div
        v-for="(pillar, index) in pillars"
        :key="index"
        class="group border-main/10 bg-plate/40 hover:border-glow/50 hover:bg-plate/60 hover:shadow-glow/10 relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div class="mb-6 flex items-center gap-4">
          <div
            class="bg-void/50 ring-main/10 group-hover:ring-rust/50 flex h-12 w-12 items-center justify-center rounded-lg ring-1 transition-colors"
          >
            <Icon :name="pillar.icon" class="text-rust h-7! w-7!" />
          </div>
          <h3 class="font-heading text-main text-2xl font-bold tracking-wide">
            {{ pillar.title }}
          </h3>
        </div>

        <p class="text-mute text-lg leading-relaxed">
          {{ pillar.desc }}
        </p>

        <div
          class="bg-rust/10 pointer-events-none absolute -top-10 -right-10 h-32 w-32 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </div>
  </section>
</template>
