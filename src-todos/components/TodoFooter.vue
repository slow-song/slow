<template>
      <div class="todo-footer">
        <label>
          <input type="checkbox" v-model="isChecked"/>
          <!--<slot name="check"></slot>-->
          	<!--利用插槽slot-->
        </label>
        <span>
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
        <button class="btn btn-danger" @click="deleteAllCheck" v-show="completeSize">清除已完成任务</button>
      </div>
	
</template>

<script>
	export default{
		props:{
			todos:Array,
			deleteAll:Function,
			selectAll:Function
		},
		methods:{
			deleteAllCheck(){
				const {deleteAll}=this
				if(window.confirm(`确认删除所选中内容吗?`)){
					deleteAll()
				}
				
			}
		},
		computed:{
			completeSize(){
				return this.todos.reduce((preTotal,todo) =>preTotal+(todo.complete?1:0),0)
			},
			isChecked:{
				get(){
					return this.completeSize===this.todos.length && this.completeSize>0
				},
				set(value){
					this.selectAll(value)
				}
			}
		}
	}
</script>

<style>
	/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}

</style>