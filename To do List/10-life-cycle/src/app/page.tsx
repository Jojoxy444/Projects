'use client'

import { useState, useEffect } from 'react'
import Task from '../components/Task'

const App = () => {
  // Récupérer les tâches depuis le local storage ou utiliser des tâches initiales
  const initialTasks = JSON.parse(localStorage.getItem('tasks'))

  const [tasks, setTasks] = useState(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [editedTask, setEditedTask] = useState({ id: 0, name: '', isChecked: false })

  // Mettre à jour le local storage chaque fois que les tâches changent
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: !task.isChecked }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
      const updatedTasks = [...tasks, { id: newId, name: newTask, isChecked: false }]
      setTasks(updatedTasks)
      setNewTask('')
    }
  }

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const editTask = (id: number, newName: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(updatedTasks)
    setEditedTask({ id: 0, name: '', isChecked: false })
  }

  const markAllCompleted = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, isChecked: true }))
    setTasks(updatedTasks)
  }

  const markAllInitial = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, isChecked: false }))
    setTasks(updatedTasks)
  }

  const completedTasks = tasks.filter((task) => task.isChecked)
  const pendingTasks = tasks.filter((task) => !task.isChecked)

  return (
    <div className="App">
      <button onClick={markAllCompleted}>Marquer tout comme terminé</button>
      <button onClick={markAllInitial}>Marquer tout comme en cours</button>

      <div>
        <br />
      </div>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une nouvelle tâche"
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      <div>
        <h2>En cours</h2>
        {pendingTasks.map((task) => (
          <div key={task.id} className="task-container">
            <Task
              name={task.name}
              isCheck={task.isChecked}
              toggleTask={() => toggleTask(task.id)}
              removeTask={() => removeTask(task.id)}
            />
            <button onClick={() => setEditedTask({ id: task.id, name: task.name, isChecked: task.isChecked })}>
              Modifier
            </button>
            <br />
            <br />
          </div>
        ))}
      </div>

      <div>
        <h2>Terminées</h2>
        {completedTasks.map((task) => (
          <div key={task.id} className="task-container">
            <Task
              name={task.name}
              isCheck={task.isChecked}
              toggleTask={() => toggleTask(task.id)}
              removeTask={() => removeTask(task.id)}
            />
            <div className="task-buttons">
              <button onClick={() => setEditedTask({ id: task.id, name: task.name, isChecked: task.isChecked })}>
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {editedTask.id !== 0 && (
        <div>
          <br />
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          />
          <button onClick={() => editTask(editedTask.id, editedTask.name)}>Valider</button>
        </div>
      )}

      <p>{tasks.every((t) => t.isChecked) ? 'Toutes les cases sont cochées' : 'Veuillez cocher toutes les cases'}</p>
    </div>
  )
}

export default App
