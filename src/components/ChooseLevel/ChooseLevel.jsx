import { Wrapper } from '../Wrapper';
import React from 'react';

import Img from '../../assets/symbol-thin.png';

const onSelectLevel = (level) => () => {
  switch (level) {
    case 'easy': {
      console.log('easy');
      // navigate(ROUTES.questionEasy);
      break;
    }
    case 'medium': {
      console.log('medium');
      break;
    }
    case 'hard': {
      console.log('hard');
      break;
    }
    default: {
      console.log('default');
      break;
    }
  }
}

export const ChooseLevel = () => {
  return (
    <Wrapper>
      <div className="blocks">
        <div className="block">
          <img src={Img} className="block-image" alt="" />
          <button onClick={onSelectLevel('easy')} className="default-btn">
            Level: Easy
          </button>
        </div>
        <div className="block">
          <img src={Img} className="block-image" alt="" />
          <button onClick={onSelectLevel('medium')} className="default-btn">
            Level: Medium
          </button>
        </div>
        <div className="block">
          <img src={Img} className="block-image" alt="" />
          <button onClick={onSelectLevel('hard')} className="default-btn">
            Level: Hard
          </button>
        </div>
      </div>
    </Wrapper>
  )
}