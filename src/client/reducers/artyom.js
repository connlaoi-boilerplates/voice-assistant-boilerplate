import {
  VOICE_ASSISTANT_START,
  VOICE_ASSISTANT_STOP,
  VOICE_ASSISTANT_FAIL,
  VOICE_LISTENING_START,
  VOICE_LISTENING_STOP,
  VOICE_LISTENING_ERROR,
  VOICE_FETCHDATA_LOAD,
  VOICE_FETCHDATA_SUCCEED,
  VOICE_FETCHDATA_FAIL,
  VOICE_FETCHVOICE_LOAD,
  VOICE_FETCHVOICE_SUCCEED,
  VOICE_FETCHVOICE_FAIL,
  VOICE_ASSISTANT_TOGGLE,
  VOICE_NAVIGATION_REDIRECT
} from '../constants/actionTypes'
const initState = {
  isToggled: false,
  isListening: false,
  isThinking: false,
  isReplying: false,
  newLocation: null,
  assistantError: null
}
export default (state = initState, action) => {
  switch (action.type) {
    case VOICE_ASSISTANT_START:
      return {
        ...state
      }
    case VOICE_ASSISTANT_STOP:
      return {
        ...state
      }
    case VOICE_ASSISTANT_FAIL:
      return {
        ...state
      }
    case VOICE_LISTENING_START:
      return {
        ...state,
        isListening: true
      }
    case VOICE_LISTENING_STOP:
      return {
        ...state,
        isListening: false,
        isReplying: false,
        isThinking: false
      }
    case VOICE_LISTENING_ERROR:
      return {
        ...state,
        assistantError: action.assistantError,
        isListening: false,
        isReplying: false,
        isThinking: false
      }
    case VOICE_FETCHDATA_LOAD:
      return {
        ...state,
        isThinking: true
      }
    case VOICE_FETCHDATA_SUCCEED:
      return {
        ...state,
        isThinking: false
      }
    case VOICE_FETCHDATA_FAIL:
      return {
        ...state,
        assistantError: action.assistantError
      }
    case VOICE_FETCHVOICE_LOAD:
      return {
        ...state,
        isReplying: true
      }
    case VOICE_FETCHVOICE_SUCCEED:
      return {
        ...state,
        isReplying: false
      }
    case VOICE_FETCHVOICE_FAIL:
      return {
        ...state,
        assistantError: action.assistantError
      }
    case VOICE_ASSISTANT_TOGGLE:
      return {
        ...state,
        isToggled: action.isToggled
      }
    case VOICE_NAVIGATION_REDIRECT:
      return {
        ...state,
        newLocation: action.newLocation
      }
    default:
      return state
  }
}
