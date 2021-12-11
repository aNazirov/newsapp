import React from 'react';
import { defaultSystemFonts, RenderHTML } from 'react-native-render-html';

import { useWindowDimensions, View } from 'react-native';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';

interface Props {
  html: string;
  link?: string
}

const renderers = {
  iframe: IframeRenderer
};
const customHTMLElementModels = {
  iframe: iframeModel,
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
            <View style={{ marginBottom: 10 }}/>
          </View>
          )
        : (
            <RenderHTML
              renderers={renderers}
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              WebView={WebView}
              source={source}
              baseStyle={{fontFamily: 'roboto-regular'}}
              systemFonts={systemFonts}
              enableExperimentalMarginCollapsing={true}
            />
          )
      }
    </>
  );
};