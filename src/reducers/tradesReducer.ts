import { produce } from 'immer';

import {
  UPDATE_ME, UPDATE_PROFILE, UPDATE_TRADES, RESET_STATE,
} from '@/types/actionTypes';
import { isObject, mergeTrades } from '@/utils';

const initialState = {
  data: {},
};

const tradesReducer = (state = initialState, action) => produce(state, draft => {

  if (action.type === UPDATE_ME) {
    const { trade, trades } = action.payload;
    if (isObject(trade)) {
      draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
    }
    if (Array.isArray(trades)) {
      for (const trade of trades) {
        draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
      }
    } else if (isObject(trades)) {
      for (const trade of Object.values<any>(trades)) {
        draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
      }
    }
  }

  if (action.type === UPDATE_PROFILE) {
    // only if profile stxAddr === me's stxAddr
  }

  if (action.type === UPDATE_TRADES) {
    const { trade, trades, removeIds } = action.payload;
    if (isObject(trade)) {
      draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
    }
    if (Array.isArray(trades)) {
      for (const trade of trades) {
        draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
      }
    } else if (isObject(trades)) {
      for (const trade of Object.values<any>(trades)) {
        draft.data[trade.id] = mergeTrades(draft.data[trade.id], trade);
      }
    }
    if (Array.isArray(removeIds)) {
      for (const id of removeIds) delete draft.data[id];
    }
  }

  if (action.type === RESET_STATE) {
    return structuredClone(initialState);
  }
});

export default tradesReducer;
