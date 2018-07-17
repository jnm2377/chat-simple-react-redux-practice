//1. WRITE FUNCTION TO CREATE STORE
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = []; //array of listener functions

  const subscribe = (listener) => {
    listeners.push(listener) //will push listener function
  };

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(x => x());
      //calls each function inside listeners array
  };

  return {
    //returns createStore methods
    //can use as:
    subscribe, //createStore(r,i).subscribe(functionParameter for listener)
    getState, //createStore(r,i).getState()
    dispatch, //createStore(r,i).dispatch(actionobj here)
  };
}

//2. WRITE FUNCTION FOR REDUCER
function reducer(state, action) {
  //when reducer recieves ADD_MESSAGE action, it'll
  //append the new message at the end of the msgs array
  if(action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message)
    }
    //when reducer recieves DELETE_MESSAGE action, it'll
    //return TWO slices, all items indexed 0 to the item we want to delete
    //and all items from the one we want to delete to the end
  } else if(action.type === 'DELETE_MESSAGE') {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length)
      ]
    };
  //otherwise it'll return state unmodified
  } else {
    return state;
  }
}

//3. TEST CODE
const initialState = { messages: [] };
const store = createStore(reducer, initialState);

const listener = () => {
  console.log('Current state:');
  console.log(store.getState());
};

store.subscribe(listener);

const addMessageAction1 = {
  type: 'ADD_MESSAGE',
   message: 'How do you read?'
};
store.dispatch(addMessageAction1);

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'I read you loud and clear, Houston.'
};
store.dispatch(addMessageAction2);

const deleteMessageAction = {
  type: 'DELETE_MESSAGE',
  index: 0
};
store.dispatch(deleteMessageAction)

//
// const addMessageAction1 = {
//   type: 'ADD_MESSAGE',
//   message: 'How does it look, Neil?'
// };
// store.dispatch(addMessageAction1);
// const stateV1 = store.getState();
//
// const addMessageAction2 = {
//   type: 'ADD_MESSAGE',
//   message: 'Looking good'
// }
// store.dispatch(addMessageAction2);
// const stateV2 = store.getState();
//
// console.log('State v1:');
// console.log(stateV1);
// console.log('State v2:');
// console.log(stateV2);
//
// const deleteMessageAction = {
//   type: 'DELETE_MESSAGE',
//   index: 0
// };
// store.dispatch(deleteMessageAction);
// const stateV3 = store.getState();
//
// console.log('State v3:');
// console.log(stateV3);
