import React, { useState, useEffect } from 'react'

function App() {
  const [input, setInput] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  //save todos to local storage
  useEffect( () => {
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  //add todo function 

  function addTodo() {

    if (input.trim() === "") return

    //change this array function to object function to add more features like completed, id etc
    //setTodos([...todos, input])

    setTodos([
      ...todos,
      {
        text:input, completed:false
      }
    ])
    setInput("")
  }

  //delete todo function

  function deleteTodo(index) {
    const newTodos = todos.filter((_, i) => i !== index)
    setTodos(newTodos)
  }

  //add toggle complete function
  function toggleTodo(index){
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-xl shadow-xl p-6 w-full max-w-md'>
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">React Todo App</h1>
        <h3 className="text-center text-gray-600 mb-4">Made with React and Tailwind CSS</h3>
        
        <div className='flex gap-2'>
          <input
          placeholder='Enter a task...'
          value={input}
          onChange={(e) => setInput(e.target.value)} 
          className='flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          <button onClick={addTodo}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition'>Add</button>
        </div>

        {/* show todos */}
        <ul className="mt-4 space-y-2">

          {todos.map((todo, index) => (

            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
            >

              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                  className="w-4 h-4 cursor-pointer"
                />


                <span
                  className={`${
                    todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>

              </div>


              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>


            </li>

          ))}

        </ul>
      </div>
    </div>
  )
}

export default App