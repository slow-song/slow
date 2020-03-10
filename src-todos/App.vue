<template>
<div id="app">
  <div class="todo-container">
    <div class="todo-wrap">
	<TodoHead :addTodo="addTodo"/>
	<TodoList :todos="todos" :deleteTodo="deleteTodo"/>
	<TodoFooter :todos="todos" :deleteAll="deleteAll" :selectAll="selectAll"/>
    </div>
  </div>
</div>
	
</template>

<script>
	import TodoHead from './components/TodoHead.vue'
	import TodoList from './components/TodoList.vue'
	import TodoFooter from './components/TodoFooter.vue'
	export default{
		data(){
			return{
				todos:JSON.parse(window.localStorage.getItem('todos_key') || '[]')
			}
		},
		methods:{
			addTodo(todo){
				this.todos.unshift(todo)
			},
			deleteTodo(index){
				this.todos.splice(index,1)
			},
			//删除选中的todo
			deleteAll(){
				//过滤出选中的todo
				this.todos=this.todos.filter(todo =>!todo.complete) 
				
			},
			//全选或者不全选
			selectAll(check){
				this.todos.forEach(todo =>todo.complete=check)
			}
			
		},
		watch:{
			todos:{
				deep:true,
				handler:function(value){
					window.localStorage.setItem('todos_key',JSON.stringify(value))
				}
			}
		},
		components:{
			TodoHead,
			TodoList,
			TodoFooter
		}
	}
</script>

<style>

/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>