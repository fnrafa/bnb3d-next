import {Head, Html, Main, NextScript} from "next/document";
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/apple-touch-icon.png" color="#00C9FF"/>
                <meta name="theme-color" content="#0B0F19"/>

                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="author" content="BNB3D AI Team"/>
                <meta
                    name="keywords"
                    content="BNB3D AI, 3D Model Generation, AI 3D, Machine Learning, 3D Art, NFT, Automation, Digital Design"
                />
                <meta
                    name="description"
                    content="BNB3D AI is revolutionizing 3D model generation using AI-driven automation. Transform ideas into stunning 3D assets instantly."
                />

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://bnb3d.tech/"/>
                <meta property="og:title" content="BNB3D AI - Next-Gen AI 3D Model Generation"/>
                <meta
                    property="og:description"
                    content="Transform your ideas into AI-generated 3D assets with BNB3D AI. High-quality, instant 3D modeling powered by advanced artificial intelligence."
                />
                <meta property="og:image" content="/icon.png"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:url" content="https://bnb3d.tech/"/>
                <meta name="twitter:title" content="BNB3D AI - Next-Gen AI 3D Model Generation"/>
                <meta
                    name="twitter:description"
                    content="Transform your ideas into AI-generated 3D assets with BNB3D AI. High-quality, instant 3D modeling powered by AI."
                />
                <meta name="twitter:image" content="/icon.png"/>

                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"/>

                <link rel="canonical" href="https://bnb3d.tech/"/>
            </Head>
            <body className="bg-background text-white antialiased">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
