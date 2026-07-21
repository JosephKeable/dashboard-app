<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const router = useRouter()
  router.push({ name: 'home' })
})
</script>
