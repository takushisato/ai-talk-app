<template>
  <div vclass="text-center">
    <v-snackbar :model-value="modelValue" multi-line location="center" @update:model-value="close">
      <p>申し訳ございません、問題が発生しました。下記内容をご確認いただき入力の内容を修正してください</p>
      <br />
      <p>問題：</p>
      <div>
        {{ errorMessage }}
      </div>
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="close"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "CommonSnackBar",
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ["update:model-value"],
  methods: {
    close() {
      this.$emit("update:model-value", false);
    },
  },
});
</script>
