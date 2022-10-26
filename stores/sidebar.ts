import { entity } from 'simpler-state'

const store = entity(false)

export const sidebar = {
  ...store,
  toggle: () => store.set(!store.get()),
}
