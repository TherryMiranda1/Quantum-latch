import { createLazyFileRoute } from '@tanstack/react-router'
import { View } from '../components'
import { SignIn } from './../Views/SignIn'

export const Route = createLazyFileRoute('/login')({
  component: () => (
    <View applyMaxWidth={false}>
      <SignIn />
    </View>
  ),
})
