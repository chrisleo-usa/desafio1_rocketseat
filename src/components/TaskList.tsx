import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if (!newTaskTitle) return // Se título for branco ao submeter, irá retornar aqui e não executará o restante do código. 

    const newTask = { // constante criando um objeto com os dados solicitados.
      id: Math.random(), //id com número randômico
      title: newTaskTitle, //título é o valor capturado ao submeter no botão, lembrando que em branco não é salvo. 
      isComplete: false, //isComplete por default fica como false, para não dar como checked. 
    }

    setTasks(oldState => [...oldState, newTask]) //seta o estado da lista de tasks com os valores antigos e adicionando o valor novo. 
    setNewTaskTitle('') // deixando em branco novamente o input de tarefa. 

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    const completeTask = tasks.map(task => task.id === id ? { //percorre a lista de tasks e a task que tiver o mesmo Id da que está sendo selecionada
      ...task, // retornará todos os dados dessa task
      isComplete: !task.isComplete, // sendo que isComplete será alterado, como por default é false, ao negar ele se torna true
    } : task) // se não, retorna a task sem alterações. 

    setTasks(completeTask) // seta o estado da lista com as alterações do completeTask. 
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const filteredTask = tasks.filter(task => task.id !== id) // filtra apenas os dados em que o ID da task não é igual ao ID selecionado. 
    setTasks(filteredTask) // seta o estado da lista com as alterações do filtered task. 
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}