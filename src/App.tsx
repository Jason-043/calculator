import './App.css'
import { useReducer } from 'react';
import DigitButton from './digitButton';
import OperationButton from './operationButton';
import NegateButton from './negateButton';

export const ACTIONS = {
  ADD_DIGIT: 'addDigit',
  CHOOSE_OPERATION: 'chooseOperation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'deleteDigit',
  EVALUATE: 'evaluate',
  NEGATE: 'negate'
}

interface State {
  currentOperand: string;
  previousOperand: string;
  operation: string;
  overwrite: boolean;
}

interface Action {
  type: string;
  payload: {
    digit: string;
    operation: string;
  }
}

function reducer(state: State, {type, payload}: Action){
  console.log(state.currentOperand);
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false
      }
      if(payload.digit === "0" && state.currentOperand === "0") return state;
      if(payload.digit === "." && (state.currentOperand == null || state.currentOperand == "")){
        return {
          ...state,
          currentOperand: "0."
        }
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousOperand == null) return state;
      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if(state.currentOperand == null) return state;
      if(state.currentOperand.length === 1) return {
        ...state,
        currentOperand: null
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null) return state;
      return {
        ...state,
        overwrite: true,
        previousOperand:null,
        currentOperand: evaluate(state),
        operation: null
      }
    case ACTIONS.NEGATE:
      if(state.currentOperand == null) return state;
      return {
        ...state,
        currentOperand: `${-parseFloat(state.currentOperand)}`
      }
    default:
      return state;
  }
}

function evaluate(state: State){
  console.log(state)
  let prevOperand: number = parseFloat(state.previousOperand);
  let currOperand: number = parseFloat(state.currentOperand);
  if(isNaN(prevOperand) || isNaN(currOperand)) return "";
  switch (state.operation) {
    case "+":
      return `${prevOperand + currOperand}`;
    case "-":
      return `${prevOperand - currOperand}`;
    case "*":
      return `${prevOperand * currOperand}`;
    case "÷":
      return `${prevOperand / currOperand}`;
    default:
      return "";
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,});

function formatOperand(operand: string){
  if(operand == null) return;
  const [integer, decimal] = operand.split(".");
  if(decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

function App() {
  
  type DispatchType = (obj: { type: string, payload?: any }) => void;
  const [{currentOperand, previousOperand, operation}, dispatch]: [State, DispatchType]  = useReducer(reducer, {})
  return (
    <div className = "calculatorGrid">
      <div className="titleBar">Calculator</div>
      <div className = "output"> 
        <div className='previousOperand'>{formatOperand(previousOperand)} {operation}</div>
        <div className='currentOperand'>{formatOperand(currentOperand)}</div>
      </div>
      <button className='' onClick={ () => dispatch({type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={ () => dispatch({type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <NegateButton operation= "+/-" dispatch={dispatch} />
      <OperationButton operation= "÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />

      <OperationButton operation= "*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />

      <OperationButton operation= "+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />

      <OperationButton operation= "-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />

      <button className='spanTwo' onClick={ () => dispatch({type: ACTIONS.EVALUATE })}>=</button>
    </div>
  )


}

export default App
