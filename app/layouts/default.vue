<template>
  <VApp>
    <VLayout>
      <VAppBar :elevation="2">
        <VAppBarTitle>Dashboard - Monitoring the Situation</VAppBarTitle>
        <template #append>
          <VBtn
            class="mr-1"
            append-icon="mdi-filter"
            size="large"
            variant="tonal"
            @click="toggleFilterDrawer"
          >
            Filters
          </VBtn>
        </template>
      </VAppBar>
      <VNavigationDrawer
        v-model="filterDrawerOpen"
        app
        location="end"
        width="350"
      >
        <FilterMenu />
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
