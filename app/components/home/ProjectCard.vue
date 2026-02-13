<script setup lang="ts">
interface TechStack {
  name: string;
  icon: string;
}

interface Project {
  title: string;
  desc: string;
  image: string;
  link: string;
  stack: TechStack[];
}

defineProps<{
  project: Project;
}>();
</script>

<template>
  <NuxtLink
    :to="project.link"
    class="group border-main/10 bg-plate/30 hover:border-rust/50 hover:shadow-glow/10 relative flex h-96 transform flex-col overflow-hidden rounded-3xl border backdrop-blur-md transition-all duration-300 ease-out select-text hover:-translate-y-2 hover:shadow-2xl"
  >
    <div class="border-main/10 bg-void/50 relative h-48 w-full overflow-hidden border-b">
      <NuxtImg
        :src="project.image"
        :alt="project.title"
        format="webp"
        loading="lazy"
        class="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div
        class="from-plate/90 via-plate/40 absolute inset-0 scale-[1.01] bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"
      />
    </div>

    <div class="flex flex-1 flex-col justify-between p-8">
      <div>
        <h3
          class="font-heading group-hover:text-glow mb-3 text-2xl font-bold text-white transition-colors duration-300"
        >
          {{ project.title }}
        </h3>
        <p class="text-mute line-clamp-2 text-sm leading-relaxed">
          {{ project.desc }}
        </p>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="tech in project.stack"
          :key="tech.name"
          class="border-main/10 group-hover:border-glow/50 flex items-center gap-1.5 rounded-full border bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 transition-colors duration-300"
        >
          <Icon :name="tech.icon" class="h-3.5 w-3.5 opacity-80" />
          {{ tech.name }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
