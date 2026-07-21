<template>
  <VApp>
    <VLayout>
      <VAppBar :elevation="2">
        <VAppBarTitle>Dashboard - Monitoring the Situation</VAppBarTitle>
        <template #append>
          <VBtn
            icon
            @click="toggleFilterDrawer"
          >
            <VIcon>mdi-filter</VIcon>
          </VBtn>
        </template>
      </VAppBar>
      <VNavigationDrawer
        v-model="filterDrawerOpen"
        app
        location="end"
      >
        // Add your filter drawer component here
      </VNavigationDrawer>
      <VMain>
        <slot />
      </VMain>
    </VLayout>
  </VApp>
</template>

<script setup>
import { ref } from 'vue'

const filterDrawerOpen = ref(false)
function toggleFilterDrawer() {
  filterDrawerOpen.value = !filterDrawerOpen.value
}
</script>
