import * as React from 'react'
import VideoPlayer from 'react-player'

import {
  Button,
  Modal,
  ModalBackground,
  ModalClose,
} from 'bloomer'

interface VideoModalProps {
  isActive: boolean,
  launchModal: any,
}

const LearnMoreModal = (props: VideoModalProps) => (
  <Modal isActive={props.isActive}>
    <ModalBackground onClick={props.launchModal}>
      <VideoPlayer height="100%" width="100%" url="https://vimeo.com/223643114" playing={props.isActive} />
    </ModalBackground>
    <ModalClose onClick={props.launchModal} />
  </Modal >
)

export class LearnMoreVideo extends React.Component<{}, { isActive: boolean, isActiveCard: boolean }> {
  state = {
    isActive: false,
    isActiveCard: false,
  }

  launchModal = () => this.setState((state) => ({ ...state, isActive: !state.isActive }))
  launchModalCard = () => this.setState((state) => ({ ...state, isActiveCard: !state.isActiveCard }))

  render() {
    return (
      <div>
        <Button onClick={this.launchModal} isColor="info">
          <span className="fas fa-play-circle fa-fw"></span>
          Learn More
        </Button>
        <LearnMoreModal isActive={this.state.isActive} launchModal={this.launchModal} />
      </div>
    )
  }
}
