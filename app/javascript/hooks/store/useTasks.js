import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';
import { STATES as states } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadColumn, createTask, destroyTask, loadTask, updateTask } = useTasksActions();
  const loadBoard = () => Promise.all(states.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
    loadColumn,
    loadTask,
    createTask,
    destroyTask,
    updateTask,
  };
};

export default useTasks;
