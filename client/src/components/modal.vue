<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':mdFlag}">
        <div class="md-modal-inner">
          <div class="md-top">
            <slot  name="md-title"></slot>
            <button class="md-close" @click="closeMd()">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <slot name="modal-msg"></slot>
            </div>
            <div class="login-wrap">
             <slot name="modal-btn"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="mdFlag" @click="closeMd()"></div>
    </div>
</template>

<script>
    export default {

      props:['mdFlag'],
      data(){
        return{

        }
      },
      methods:{
        closeMd(){
          this.$emit('close')
        }
      }
    }
</script>

<style scoped>

</style>
