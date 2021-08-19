
import React from 'react';

// hepler
import { canAction } from 'helpers/canAction';

function PhotoList() {

  return (
    <div>
      this is PhotoList

      {canAction('create', 'CREATE_NEW_PHOTO') && (<button>
        create photo
      </button>) }
      
    </div>
  )
}

export default PhotoList
