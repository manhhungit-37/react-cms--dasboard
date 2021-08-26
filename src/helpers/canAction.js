import { AbilityBuilder, Ability } from '@casl/ability';
import store from 'store/store';

// configs
import { ACTION_NAME } from 'configs/roles';

function defineAbilitiesFor(role) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch(role) {
    case 'admin': {
      can(['create', 'update', 'view', 'delete'], 'all');
      break;
    }
    case 'operator': {
      // photo
      can(['create', 'view'], [ACTION_NAME.CREATE_NEW_PHOTO, ACTION_NAME.VIEW_PHOTO]);
      break;
    }
    case 'guest': {
      cannot(['create', 'update', 'view', 'delete'], 'all');
      break;
    }
    default:
      break
  }

  return build();
};

export const canAction = (action, resource) => {
  const role = store.getState().user.user?.role;
  if(!role) return;

  const abilities = defineAbilitiesFor(role);
  return abilities.can(action, resource)
};