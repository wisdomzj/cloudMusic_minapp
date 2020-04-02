<template>
  <div class="simditor">
    <textarea
      :id="id"
      :value="value"
      :placeholder="options.placeHolder"
    />
  </div>
</template>
<script>
import $ from 'jquery'
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'
export default {
  name: 'Simditor',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: String,
      default: 'article'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      edited: false
    }
  },
  watch: {
    value(val) {
      if (!this.edited) {
        this.editor.setValue(val)
      }
    }
  },
  mounted() {
    const self = this
    this.editor = new Simditor(Object.assign({}, {
      textarea: $(`#${self.id}`)
    }, this.options))

    this.editor.on('valuechanged', function() {
      // 加载默认值
      self.edited = true

      // 数据双向绑定
      self.$emit('input', self.editor.getValue())
    })
  }
}
</script>

<style scoped>
    .simditor{
        border: 1px solid #ffffff;
        margin-bottom: 20px;
        width: 100%;
    }
</style>
