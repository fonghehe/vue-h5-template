<script setup lang="ts">
import { computed } from 'vue';

import DOMPurify from 'dompurify';
import { marked } from 'marked';

const props = defineProps<{ content: string }>();

const sanitizedHtml = computed(() => {
  const rendered = marked.parse(props.content, {
    async: false,
    breaks: true,
    gfm: true,
  }) as string;
  return DOMPurify.sanitize(rendered, {
    USE_PROFILES: { html: true },
  });
});
</script>

<template>
  <!-- HTML is generated from Markdown and sanitized before rendering. -->
  <!-- eslint-disable-next-line vue/no-v-html -- DOMPurify is the trust boundary. -->
  <div class="markdown-content" v-html="sanitizedHtml"></div>
</template>

<style scoped>
.markdown-content {
  font-size: 15px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.markdown-content :deep(p) {
  margin: 0 0 10px;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 20px;
  margin: 8px 0;
}

.markdown-content :deep(pre) {
  max-width: 100%;
  padding: 12px;
  overflow-x: auto;
  color: #e7eaf0;
  background: #17202e;
  border-radius: 10px;
}

.markdown-content :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
}

.markdown-content :deep(:not(pre) > code) {
  padding: 2px 5px;
  color: #8f2c53;
  background: #f6eaf0;
  border-radius: 4px;
}

.markdown-content :deep(a) {
  color: var(--app-primary);
}
</style>
