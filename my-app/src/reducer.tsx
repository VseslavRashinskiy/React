import { ArrState } from 'components/Form/Forms';

export enum ActionKind {
  INCREASE = 'update_input',
}

interface Action {
  type: ActionKind;
  payload: {
    value: string;
    model: string;
    color: string;
    location: string;
    vin: string;
  };
}

export default function reducer(state: ArrState[], action: Action) {
  console.log(state, action);
  switch (action.type) {
    case ActionKind.INCREASE:
      return [
        ...state,
        {
          id: state.length,
          car: action.payload.value,
          model: action.payload.model,
          color: action.payload.color,
          location: action.payload.location,
          vin: action.payload.vin,
        },
      ];
    default:
      return state;
  }
}
