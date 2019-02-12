import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Artyom from '../../resources/artyom'
import React, { Component } from 'react'

import {
  startAssistant,
  stopAssistant,
  startListening,
  stopListening,
  errorListening,
  fetchAssistantData,
  fetchAssistantVoice,
  onVoiceToggle
} from '../../actions/artyom'
import RosieCommandsManager from './voiceCommands.js'
import './index.less'

import { Button, message, Icon, Switch } from 'antd'
import soundError from '../../assets/error.mp3'
import soundStart from '../../assets/start_of_input.mp3'
import soundStop from '../../assets/end_of_input.mp3'

// create artyom instance
const artyom = new Artyom()

class ArtyomRosie extends Component {
  constructor(props, context) {
    super(props, context)

    let CommandsManager = new RosieCommandsManager(artyom)
    CommandsManager.loadCommands()

    artyom.when('NOT_COMMAND_MATCHED', function(error) {
      props.handleFetchAssistantData(artyom, props)
    })

    artyom.when('ERROR', function(error) {
      if (error.code == 'no-speech' && artyom.ArtyomProperties.triggered == true) {
        props.handleStopListening(artyom, props)
      }
    })
  }

  componentDidMount() {
    if (this.props.isLoggedIn && this.props.isToggled) {
      this.props.handleStartAssistant(artyom, this.props)
    }
  }

  componentWillUnmount() {
    this.props.handleStopAssistant(artyom, this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isLoggedIn !== nextProps.isLoggedIn) {
      return true
    } else if (this.props.history.location.pathname !== nextProps.history) {
      return true
    } else if (this.props.isToggled !== nextProps.isToggled) {
      return true
    } else if (this.props.isListening !== nextProps.isListening) {
      return true
    } else if (this.props.isThinking !== nextProps.isThinking) {
      return true
    } else if (this.props.isReplying !== nextProps.isReplying) {
      return true
    } else if (nextProps.assistantError !== null) {
      return false
    } else {
      return false
    }
  }

  render() {
    const { isLoggedIn, isToggled, isListening, isThinking, isReplying, children } = this.props
    return (
      <div
        style={{
          height: '100%'
        }}
      >
        {isLoggedIn && (
          <a
            disabled={isThinking || isReplying}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              this.props.handleOnVoiceToggle(artyom, this.props)
            }}
            style={{
              zIndex: 10000,
              position: 'absolute',
              top: '20px',
              right: '200px'
            }}
          >
            <audio id="soundStart" src={soundStart} />
            <audio id="soundStop" src={soundStop} />
            <audio id="soundError" src={soundError} />
            <Switch
              defaultChecked={isToggled}
              loading={isThinking || isReplying}
              checkedChildren={<Icon type="check-circle" />}
              unCheckedChildren={<Icon type="close-circle" />}
            />
          </a>
        )}
        {children}
      </div>
    )
  }
}

ArtyomRosie.defaultProps = {
  isToggled: false,
  isListening: false,
  isThinking: false,
  isReplying: false,
  newLocation: null,
  assistantError: null
}

const mapStateToProps = (state) => {
  const { isToggled, isListening, isThinking, isReplying, assistantError } = state.artyom
  const isLoggedIn = !!state.app.accessToken
  return {
    isLoggedIn,
    isToggled,
    isListening,
    isThinking,
    isReplying,
    assistantError
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleStartAssistant: (artyom, props) => dispatch(startAssistant(artyom, props)),
  handleStopAssistant: (artyom, props) => dispatch(stopAssistant(artyom, props)),
  handleStartListening: (artyom, props) => dispatch(startListening(artyom, props)),
  handleStopListening: (artyom, props) => dispatch(stopListening(artyom, props)),
  handleErrorListening: (artyom) => dispatch(errorListening(artyom)),
  handleFetchAssistantData: (artyom, props) => dispatch(fetchAssistantData(artyom, props)),
  handleFetchAssistantVoice: (artyom, props, text) => dispatch(fetchAssistantVoice(artyom, props, text)),
  handleOnVoiceToggle: (artyom, props) => dispatch(onVoiceToggle(artyom, props))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtyomRosie))
