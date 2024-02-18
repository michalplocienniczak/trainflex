import { ThemeConfig } from 'antd'
import { basicTheme } from './theme'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: basicTheme.colors.accent,
    colorPrimaryActive: basicTheme.colors.accent,

    //border-radius
    borderRadiusLG: 20,
    borderRadius: 15,
  },
  components: {
    Button: {
      //large size button settings
      paddingBlockLG: 10,
      paddingInlineLG: 20,
      controlHeightLG: 50,
      //default size button settings
      paddingBlock: 7,
      paddingInline: 15,
      controlHeight: 40,

      //primary / active button styles
      defaultActiveColor: basicTheme.colors.accent,
      defaultActiveBorderColor: basicTheme.colors.accent,
      primaryColor: basicTheme.colors.primary,
      colorTextLightSolid: basicTheme.colors.primary,

      //Default button styles
      defaultBg: basicTheme.colors.primary,
      defaultBorderColor: basicTheme.colors.primary,
      defaultHoverBg: basicTheme.colors.primary,
      defaultColor: basicTheme.colors.background.primary,
      defaultHoverColor: basicTheme.colors.background.primary,
      defaultHoverBorderColor: basicTheme.colors.background.primary,
    },
  },
}
