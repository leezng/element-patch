<template>
  <div class="elx-tag-select">
    <div
      :class="{
        'elx-tag-select-item': true,
        'elx-tag-select-checked': isAllChecked
      }"
      @click="toggleCheckedAll">
      全部
    </div>
    <div
      v-for="item in data" :class="{
        'elx-tag-select-item': true,
        'elx-tag-select-checked': valueObj[item.value],
        'elx-tag-select-disabled': item.isDisabled
      }"
      @click="toggleChecked(item)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
  import './index.scss'

  export default {
    name: 'ElxTagSelect',
    props: {
      value: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array
      }
    },
    data () {
      return {
        currentValue: this.value || '',
        checkAll: false
      }
    },
    computed: {
      valueObj () {
        return this.currentValue.reduce((acc, cur) => {
          acc[cur.value] = cur.label
          return acc
        }, {})
      },
      isAllChecked () {
        return this.currentValue.length === this.data.length
      }
    },
    methods: {
      toggleCheckedAll () {
        this.currentValue = this.isAllChecked ? [] : this.data.map(item => item)
      },
      toggleChecked (item) {
        if (item.isDisabled) return
        const index = this.currentValue.findIndex(k => k.value === item.value)
        if (index !== -1) {
          this.currentValue.splice(index, 1)
        } else {
          this.currentValue.push(item)
        }
        this.$emit('input', this.currentValue)
      }
    }
  }
</script>
