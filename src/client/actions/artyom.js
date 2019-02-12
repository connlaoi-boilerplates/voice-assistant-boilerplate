import { connect } from 'react-redux'
import { message } from 'antd'

import {
  HOTWORD,
  HEROKU_VOICE_API_NAME,
  SNIPS_ACCOUNT_NAME,
  SNIPS_INTENTS
} from '../../client/constants/voiceProperties'

import * as ActionTypes from '../constants/actionTypes'

export const startAssistant = (artyom, props) => (dispatch) => {
  // start assistant
  artyom
    .initialize({
      lang: 'en-US',
      continuous: true,
      soundex: true,
      debug: true,
      executionKeyword: 'done',
      listen: true,
      name: HOTWORD,
      has_greeted: false
    })
    .then(() => {
      dispatch({ type: ActionTypes.VOICE_ASSISTANT_START })
    })
    .catch((err) => {
      dispatch({ type: ActionTypes.VOICE_ASSISTANT_FAIL })
    })
}

export const stopAssistant = (artyom, props) => (dispatch) => {
  // stop assistant
  artyom
    .fatality()
    .then(() => {
      dispatch({ type: ActionTypes.VOICE_ASSISTANT_STOP })
    })
    .catch((err) => {
      dispatch({ type: ActionTypes.VOICE_ASSISTANT_FAIL })
    })
}

export const onVoiceToggle = (artyom, props) => (dispatch) => {
  // update the state
  dispatch({ type: ActionTypes.VOICE_ASSISTANT_TOGGLE, isToggled: !props.isToggled })
  // start/stop assistant
  if (props.isToggled) {
    dispatch(stopAssistant(artyom))
    message.info('Off', 0.5)
  } else {
    dispatch(startAssistant(artyom))
    message.info('On', 0.5)
  }
}

export const startListening = (artyom, props) => (dispatch) => {
  if (!props.isListening) {
    // set listening, to true
    dispatch({
      type: ActionTypes.VOICE_LISTENING_START
    })
    // set has_greeted to true
    artyom.ArtyomProperties.has_greeted = true
    // play start_of_input sound bite
    document.getElementById('soundStart').play()
  }
}

export const stopListening = (artyom, props) => (dispatch) => {
  // if (props.isListening) {
  // set listening, thinking, replying to false
  dispatch({
    type: ActionTypes.VOICE_LISTENING_STOP
  })
  // set triggered, has_greeted to false
  artyom.ArtyomProperties.triggered = false
  artyom.ArtyomProperties.has_greeted = false
  // play end_of_input sound bite
  document.getElementById('soundStop').play()
  // }
}

export const errorListening = (artyom, error) => (dispatch) => {
  // error (more like not found... in here at least)
  dispatch({
    type: ActionTypes.VOICE_LISTENING_ERROR,
    assistantError: error
  })
  // set triggered, has_greeted to false
  artyom.ArtyomProperties.triggered = false
  artyom.ArtyomProperties.has_greeted = false
  // play error sound bite
  document.getElementById('soundError').play()
}

export const fetchAssistantData = (artyom, props) => async (dispatch) => {
  // start (loading)
  dispatch({ type: ActionTypes.VOICE_FETCHDATA_LOAD })

  artyom.recognized_speech = artyom.recognized_speech.replace(HOTWORD, '')
  artyom.recognized_speech = artyom.recognized_speech.replace('homepage', 'home page')

  if (artyom.ArtyomProperties.has_greeted == false) {
    // GREETING
    dispatch(startListening(artyom, props))
    artyom.ArtyomProperties.has_greeted = true
  } else if (artyom.recognized_speech != ' ') {
    // REQUESR FOR INTENT HANDLING
    let xhttp = new XMLHttpRequest()
    let api_url = 'https://' + HEROKU_VOICE_API_NAME + '.herokuapp.com/voice'
    xhttp.open('POST', api_url, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    await xhttp.send('javascript_data=' + artyom.recognized_speech)

    xhttp.onreadystatechange = async function() {
      // console.log(_props);

      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        if (response.intent != null) {
          let accountName = SNIPS_ACCOUNT_NAME + ':'
          let intent_name = response.intent.intentName.replace(accountName, '')

          // CHECK FOR VALID INTENT FROM SNIPS
          if (SNIPS_INTENTS.includes(intent_name)) {
            // HANDLE INTENT
            if (intent_name == 'Navigate') {
              let page = ''
              let eventData = ''
              let pageFound = false

              if (typeof response.slots[0] !== 'undefined') {
                page = response.slots[0].value.value
              } else {
                dispatch(errorListening(artyom, 'Invalid Navigation'))
              }

              if (page == 'Home Page') {
                pageFound = true
                page = '/'
                eventData = 'Home Loaded'
              } else if (page == 'Dashboard') {
                pageFound = true
                page = '/admin/dashboard'
                eventData = 'Dashboard Loaded'
              } else if (page == 'Users') {
                pageFound = true
                page = '/admin/users'
                eventData = 'Users Loaded'
              }

              if (pageFound) {
                dispatch(stopListening(artyom, props))
                dispatch({
                  type: ActionTypes.VOICE_FETCHDATA_SUCCEED
                })
                dispatch(fetchAssistantVoice(artyom, props, eventData))
                props.history.push(page)
                message.success(eventData, 1.5)
              } else {
                dispatch(errorListening(artyom, 'Page Not Found'))
              }
            }
          } else {
            dispatch(errorListening(artyom, 'Intent Not Recognized'))
          }
        } else {
          dispatch(errorListening(artyom, 'Response Intent Null'))
        }
      }
    }
  }
}
connect()(fetchAssistantData)

export const fetchAssistantVoice = (artyom, props, text) => async (dispatch) => {
  console.log(text)
  if (!props.isReplying) {
    // start (loading)
    dispatch({ type: ActionTypes.VOICE_FETCHVOICE_LOAD })

    // artyom & snips orgy
    let xhttp = new XMLHttpRequest()
    let api_url = 'https://' + HEROKU_VOICE_API_NAME + '.herokuapp.com/wavenet'
    xhttp.open('POST', api_url, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhttp.responseType = 'blob'
    await xhttp.send('text_to_synthesize=' + text)

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let wavenet_audio = new Audio()
        wavenet_audio.src = URL.createObjectURL(this.response)

        wavenet_audio.onloadedmetadata = function() {
          wavenet_audio.play()
          window.setTimeout(function() {
            // end (success w/ delay)
            dispatch({
              type: ActionTypes.VOICE_FETCHVOICE_SUCCEED
            })
          }, wavenet_audio.duration * 1000 + 1000)
        }
      }
    }
  } else {
    // error (fail)
    dispatch({
      type: ActionTypes.VOICE_FETCHVOICE_FAIL
    })
  }
}
connect()(fetchAssistantVoice)
