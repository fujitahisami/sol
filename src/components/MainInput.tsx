import {observer} from 'mobx-react-lite'
import {View, useColorScheme} from 'react-native'
import {TextInput} from 'react-native-macos'
import {useStore} from 'store'
import colors from 'tailwindcss/colors'
import {Widget} from 'stores/ui.store'
import {BackButton} from './BackButton'

type Props = {
  placeholder?: string
  showBackButton?: boolean
  style?: any
  className?: string
}

export const MainInput = observer<Props>(
  ({placeholder = 'What would you like to do?', showBackButton, style}) => {
    const store = useStore()
    const colorScheme = useColorScheme()

    return (
      <View
        className="h-12 px-3 flex-row items-center g-1 m-2 rounded-lg"
        style={[
          style,
          {
            backgroundColor: colorScheme === 'dark' ? '#00000025' : '#00000008',
          },
        ]}>
        {showBackButton && (
          <View className="">
            <BackButton
              onPress={() => {
                store.ui.setQuery('')
                store.ui.focusWidget(Widget.SEARCH)
              }}
            />
          </View>
        )}
        <TextInput
          autoFocus
          enableFocusRing={false}
          value={store.ui.query}
          onChangeText={store.ui.setQuery}
          // @ts-ignore
          className="text-2xl flex-1"
          placeholderTextColor={
            colorScheme === 'dark' ? colors.neutral[500] : colors.neutral[400]
          }
          selectionColor={'#FF0000'}
          placeholder={placeholder}
        />
      </View>
    )
  },
)
