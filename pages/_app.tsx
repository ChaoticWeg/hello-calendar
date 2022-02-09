import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../theme";
import "../theme/css/fullcalendar.css";

const defaultCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const { Component, pageProps, emotionCache = defaultCache } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Calendar Test</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
};

export default MyApp;
