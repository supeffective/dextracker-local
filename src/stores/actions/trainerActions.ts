import { TrainerInfo } from '../state/types'
import { DexTrackerActionFactory, DexTrackerTrainerActions } from './types'

const trainerActions: DexTrackerActionFactory<DexTrackerTrainerActions> = (setState, getState) => {
  return {
    updateTrainer(trainer) {
      const newTrainerInfo: TrainerInfo = {
        nickname: 'Trainer',
        ...getState().trainer,
        ...trainer,
      }
      setState({
        trainer: newTrainerInfo,
      })
    },
  }
}

export default trainerActions
