import { Head, Html, Main, NextScript } from 'next/document';
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/apple-touch-icon.png" color="#00C9FF" />
                <meta name="theme-color" content="#0B0F19" />

                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="author" content="fnrafa" />
                <meta name="keywords" content="LogicAI, Artificial Intelligence, Automation, Machine Learning, Data" />
                <meta name="description" content="LogicAI empowers your vision with cutting-edge AI solutions for automation, innovation, and business elevation." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.logicai.com/" />
                <meta property="og:title" content="LogicAI - Empower Your Vision with AI" />
                <meta property="og:description" content="Unleash the power of artificial intelligence to automate, innovate, and elevate your business with LogicAI." />
                <meta property="og:image" content="/icon.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://www.logicai.com/" />
                <meta name="twitter:title" content="LogicAI - Empower Your Vision with AI" />
                <meta name="twitter:description" content="Unleash the power of artificial intelligence to automate, innovate, and elevate your business with LogicAI." />
                <meta name="twitter:image" content="/icon.png" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />

                <link rel="canonical" href="https://www.logicai.com/" />
            </Head>
            <body className="bg-background text-white antialiased">
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}
