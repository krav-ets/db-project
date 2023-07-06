import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import TasksRepository from 'repositories/TasksRepository';
import { STATES } from 'presenters/TaskPresenter';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq(columnId, 'id'));

      state.board = changeColumn(state.board, column, {
        cards: meta.currentPage === 1 ? items : [...column.cards, ...items],
        meta,
      });

      return state;
    },
  },
});

const { loadColumnSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));
  const createTask = (attributes) => TasksRepository.create(attributes);
  const loadTask = (id) => TasksRepository.show(id);
  const destroyTask = (id) => TasksRepository.destroy(id);
  const updateTask = (id, attributes) => TasksRepository.update(id, attributes);

  return {
    loadBoard,
    loadColumn,
    createTask,
    loadTask,
    destroyTask,
    updateTask,
  };
};
