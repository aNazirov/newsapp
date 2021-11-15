import React from 'react';
import { defaultSystemFonts, RenderHTML } from 'react-native-render-html';

import { useWindowDimensions, View } from 'react-native';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';

interface Props {
  html: string;
  link?: string
}
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true
  }
};
const renderers = {
  iframe: IframeRenderer
};
const customHTMLElementModels = {
  iframe: iframeModel,
};
const tagsStyles: any = {
  img : {
    alignSelf: 'center',
    width: '100%',
  }
};
const systemFonts = [...defaultSystemFonts, 'roboto-regular', 'roboto-bold', 'roboto-light', 'roboto-regular-italic', 'roboto-medium']
export const EditorJs: React.FC<Props> = ({ html, link }) => {
  const source = { html };
  const { width } = useWindowDimensions();
  return (
    <>
      {
        link
        ?(
          <View style={{ height: 720 }}>
            <WebView
              automaticallyAdjustContentInsets={false}
              source={{ uri: link }}
            />
          </View>
          )
        : (
            <RenderHTML
              renderers={renderers}
              contentWidth={width - 30}
              customHTMLElementModels={customHTMLElementModels}
              WebView={WebView}
              source={source}
              baseStyle={{fontFamily: 'roboto-regular'}}
              systemFonts={systemFonts}
              enableExperimentalMarginCollapsing={true}
              tagsStyles={tagsStyles}
              renderersProps={renderersProps}
            />
          )
      }
    </>
  );
};