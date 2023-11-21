import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess({
    // ここに追加の設定を記載することができます
    typescript: true,
  })
};
