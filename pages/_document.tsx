import createEmotionServer from "@emotion/server/create-instance";
import { AppProps } from "next/dist/shared/lib/router/router";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import createEmotionCache from "../src/createEmotionCache";

interface MyDocumentProps extends AppProps {
    emotionStyleTags: JSX.Element[];
}

function MyDocument(props: MyDocumentProps) {
    const { emotionStyleTags } = props;
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                {emotionStyleTags}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: any) => {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: any) =>
                function EnhanceApp(props: any) {
                    return <App emotionCache={cache} {...props} />;
                }
        });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            dangerouslySetInnerHTML={{ __html: style.css }}
            data-emotion={`${style.key} ${style.ids.join(" ")}`}
            key={style.key}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags
    };
};

export default MyDocument;
