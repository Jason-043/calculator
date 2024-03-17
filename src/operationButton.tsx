import { ACTIONS } from './App.tsx'

type DispatchType = (obj: { type: string, payload?: any }) => void;

interface OperationButtonProps {
  dispatch: DispatchType;
  operation: string | number;
}

export default function OperationButton({dispatch, operation} : OperationButtonProps) {
    return (
    <button 
        onClick= {() => dispatch( {type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})} 
    >
        {operation}
    </button>
    )
}