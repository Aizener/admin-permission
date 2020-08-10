import Vue from 'vue'

Vue.directive('permission', {
  inserted (el, binding) {
    const value = binding.value
    const type = binding.modifiers
    value && handle(el, type)
  }
})

function handle (el, type) {
  if (type.disabled) {
    el.disabled = true
    el.classList.add('el-disabeld', 'is-disabled')
  } else if (type.remove) {
    el.parentNode.removeChild(el)
  }
}