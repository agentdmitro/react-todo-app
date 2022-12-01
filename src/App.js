import React from 'react';
import './index.scss';

function App() {
  const data = JSON.parse(localStorage.getItem('todo list'));

  const todoData = data ? data : [];

  const [inputValue, setInputValue] = React.useState('');
  const [todoList, setTodoList] = React.useState(todoData);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const todoLS = JSON.stringify(todoList);
      localStorage.setItem('todo list', todoLS);
    }

    isMounted.current = true;
  }, [todoList]);

  const createTodo = (text) => {
    if (!text || /^\s*$/.test(text)) {
      return;
    }

    if (inputValue) {
      const newTodo = {
        id: Math.random().toString(36).substring(2, 9),
        text: inputValue,
        complete: false,
      };
      setInputValue('');
      setTodoList((oldArray) => [...oldArray, newTodo]);
    }
  };

  const toggleComplete = (id) => {
    setTodoList([
      ...todoList.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo },
      ),
    ]);
  };

  const removeTask = (id) => {
    setTodoList([...todoList.filter((todo) => todo.id !== id)]);
  };

  return (
    <>
      <h1>Todos</h1>

      <form
        id="form"
        onSubmit={(e) => {
          e.preventDefault();
          createTodo(inputValue);
        }}>
        <input
          type="text"
          placeholder="Enter your todo"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <ul className="todos" id="todos">
        {todoList.map((todo, index) => (
          <li className={`${todo.complete ? 'completed' : ''}`} key={index}>
            <p onClick={() => toggleComplete(todo.id)}>{todo.text}</p>{' '}
            <span onClick={() => removeTask(todo.id)} className="close">
              X{' '}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
