<template>
  <div class="mt-8 flex justify-center">
    <nav>
      <ul class="pagination">
        <li>
          <a
            @click.prevent="changePage(previousPage)"
            href="#"
            :class="{ 'pagination-link': true, disabled: !previousPage }"
            >Prev</a
          >
        </li>
        <li>
          <a
            @click.prevent="changePage(nextPage)"
            href="#"
            :class="{ 'pagination-link': true, disabled: !nextPage }"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{ previousPage: string | null; nextPage: string | null }>();
const emit = defineEmits();

const changePage = (url: string) => {
  const offsetParam = new URL(url).searchParams.get("offset");
  const offset = offsetParam ? parseInt(offsetParam) : 0;
  emit("pageChange", offset);
};
</script>

<style scoped>
.pagination {
  @apply flex list-none p-0;
}

.pagination li {
  @apply m-0 mx-1;
}

.pagination-link {
  @apply text-white no-underline py-2 px-4 cursor-pointer;
  @apply bg-blue-700;
}

.pagination-link:hover {
  @apply bg-blue-900;
}

.pagination-link.disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
