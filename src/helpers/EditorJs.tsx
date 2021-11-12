import React from 'react';
import { RenderHTML } from 'react-native-render-html';

import { useWindowDimensions, View } from 'react-native';
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin';
import WebView from 'react-native-webview';

interface Props {
  html: string;
  link?: string
}

const renderers = {
  iframe: IframeRenderer,
};
const customHTMLElementModels = {
  iframe: iframeModel,
};

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
              baseStyle={{flex: 1}}
              customHTMLElementModels={customHTMLElementModels}
              WebView={WebView}
              source={source}
              enableExperimentalMarginCollapsing={true}
            />
          )
      }
    </>
  );
};
