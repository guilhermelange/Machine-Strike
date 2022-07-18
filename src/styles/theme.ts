import { extendTheme, withDefaultVariant } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: {
    body: {
      height: '100%',
    },
    '#__next': {
      height: '100%'
    },
  }
}

const variantFocus = () => ({
  field: {
    _focus: {
      borderColor: "var(--chakra-ui-focus-ring-color)",
      boxShadow: "0 0 0 2px var(--chakra-ui-focus-ring-color)"
    }
  }
});

const shadows = {
  outline: "0 0 0 3px var(--chakra-ui-focus-ring-color)"
}

const fonts = {
  heading: 'Roboto',
  body: 'Roboto'
}

const components = {
  Input: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Select: {
    variants: {
      outline: variantFocus,
      filled: variantFocus,
      flushed: variantFocus
    }
  },
  Textarea: {
    variants: {
      outline: () => variantFocus().field,
      filled: () => variantFocus().field,
      flushed: () => variantFocus().field
    }
  }
}

export const theme = extendTheme({
  config,
  shadows,
  fonts,
  components,
  styles
},
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'NumberInput', 'PinInput'],
  }))