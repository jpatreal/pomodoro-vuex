<template>
    <div id="timer-app">
        <div class="container">
            <v-card dark class="pink lighten-1" height="500px">
                <h2 class="mx-5">Timer</h2>
                <v-flex class="mx-4 my-4 text-center">
                    <div id="timer">
                        <span id="minutes">{{ minutes }}</span>
                        <span>:</span>
                        <span id="seconds">{{ seconds }}</span>
                    </div>
                    <v-flex>
                            <v-btn class="mx-4" v-if="!timer" @click="startTimer" :disabled="isdisabled">
                                <v-icon>play_arrow</v-icon>
                            </v-btn>
                            <v-btn class="mx-4" v-if="timer" @click="stopTimer">
                                <v-icon>stop</v-icon>
                            </v-btn>
                            <v-btn class="mx-4" v-if="resetButton" @click="resetTimer">
                                <v-icon>replay</v-icon>
                            </v-btn>
                    </v-flex>
                    <v-flex class="my-3">
                        <label> Set timer to: </label>
                        <input type="number" v-model="timervalue" :readonly="readOnly">
                    </v-flex>
                    <v-flex>
                        <v-btn class="mx-2" @click="setTime(timervalue)">
                            <v-icon class="mr-1">timer</v-icon>
                            <span>Set timer!</span>
                        </v-btn>
                    </v-flex>
                </v-flex>
            </v-card>
       </div>
    </div>
</template>

<script>
export default {
    name: 'timer',
    data(){
      return{
        readOnly: false,
        isdisabled: true,
        timervalue: null,
        resetButton: false,
      }
    },
    methods: {
      formTime(time){
        return (time < 10 ? '0' : '') + time;
      },

      startTimer(){
        this.resetButton = true
        this.$store.dispatch('startTimer') 
        this.readOnly = true 
      },
      stopTimer(){
        this.$store.commit('stopTimer')
      },
      resetTimer(){
        this.$store.commit('resetTimer')
        this.resetButton = false
        this.timervalue = null
        this.readOnly = false
        this.$store.state.timer = null
      },
      setTime(amount){
        if(this.timervalue === null){
          this.$swal({
            title: 'Timer not set!',
            type: 'error',
            text: 'Please set the timer first!'
          })
        }else{
          this.$swal({
            title: 'Are you sure?',
            text: 'You set the timer to' + ' ' + this.timervalue + ' minutes',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, set it!',
            cancelButtonText: 'Set again'
        }).then((result) => {
              if (result.value) {
              this.$store.dispatch('setTimer', amount)
              this.isdisabled = false
              this.readOnly = true
              }else{
                this.timervalue = null
              }
            })
            }
          }
    },
    computed: {
      minutes(){
        var minutes = this.$store.getters.minutes;
        return this.formTime(minutes)
      },
      seconds(){
        var seconds = this.$store.getters.seconds;
        return this.formTime(seconds);
      },
      timer: {
        get(){
          return this.$store.state.timer
        }
      },
    }
}
</script>

<style scoped>
#timer{
    font-size: 100px;
}
h2{
    font-size: 50px;
}
.container{
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
input{
    font-size: 20px;
    width: 100px;
    text-align: center;
    background-color: black;
    outline: none;
}
label{
    font-size: 20px;
}
</style>