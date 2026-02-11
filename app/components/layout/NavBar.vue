<script setup lang="ts">
import LogoSquare from '~/assets/svg/forgehexlogo-square.svg';
const route = useRoute();

const isActive = (path: string) => {
  return path === '/' ? route.path === '/' : route.path.startsWith(path);
};
</script>

<template>
  <nav
    class="bg-plate/75 sticky top-0 left-0 z-50 flex w-full items-center border-b border-white/10 px-3 py-2 text-lg shadow-md backdrop-blur-lg"
  >
    <div class="forgehex-badge-square flex-none">
      <NuxtLink to="/">
        <LogoSquare
          class="text-rust hover:text-glow h-[35px]! w-[35px]! text-4xl transition-colors duration-200"
        />
      </NuxtLink>
    </div>

    <div class="flex flex-1 justify-center gap-8">
      <NuxtLink
        to="/"
        class="border-b-2 transition-colors duration-200"
        :class="
          isActive('/') ? 'text-rust border-rust' : 'text-mute hover:text-glow border-transparent'
        "
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/projects"
        class="border-b-2 transition-colors duration-200"
        :class="
          isActive('/projects')
            ? 'text-rust border-rust'
            : 'text-mute hover:text-glow border-transparent'
        "
      >
        Projects
      </NuxtLink>

      <NuxtLink
        to="/blog"
        class="border-b-2 transition-colors duration-200"
        :class="
          isActive('/blog')
            ? 'text-rust border-rust'
            : 'text-mute hover:text-glow border-transparent'
        "
      >
        Blog
      </NuxtLink>
    </div>

    <div class="flex-none">
      <NuxtLink
        to="/contact"
        class="border px-5 py-1.5 font-bold tracking-wider uppercase transition-all duration-200"
        :class="
          isActive('/contact')
            ? 'border-rust bg-rust text-void'
            : 'border-rust text-rust hover:bg-rust hover:text-void'
        "
      >
        Contact
      </NuxtLink>
    </div>
  </nav>
</template>
