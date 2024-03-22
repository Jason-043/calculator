import { ACTIONS } from './App.tsx'

type DispatchType = (obj: { type: string, payload?: any }) => void;

interface NegateButtonProps {
  dispatch: DispatchType;
  operation: string;
}

export default function NegateButton({dispatch, operation} : NegateButtonProps) {
    return (
    <button onClick= {() => dispatch( {type: ACTIONS.NEGATE, payload: {operation}})} >
        {operation}
    </button>
    )
}