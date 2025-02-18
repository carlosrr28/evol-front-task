import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import TaskList from './app/tasks/components/task-list.component'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TaskList />
    </Provider>
  </StrictMode>,
)
