/*ignore file coverage*/

import { EntityState } from '@ngrx/entity';
import { get, keyBy } from 'lodash';

// tslint:disable-next-line: only-arrow-functions
export function createEntityState<T>(entities: T[], id: string): EntityState<T> {
  return {
    entities: keyBy(entities || [], id) || {},
    ids: (entities || []).map(entity => get(entity, id))
  };
}
