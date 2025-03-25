import { DojoApp } from './dojo-app';
import { StateProvider } from './state-provider'

export const AppRoot = () => {
  return (
    <StateProvider>
      <DojoApp />
    </StateProvider>
  )
}