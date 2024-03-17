import { ACTIONS } from './App.tsx'

type DispatchType = (obj: { type: string, payload?: any }) => void;

interface DigitButtonProps {
  dispatch: DispatchType;
  digit: string | number;
}

export default function DigitButton({dispatch, digit} : DigitButtonProps) {
    return (
    <button  onClick= {() => dispatch( {type: ACTIONS.ADD_DIGIT, payload: {digit}})} >
        {digit}
    </button>
    )
}