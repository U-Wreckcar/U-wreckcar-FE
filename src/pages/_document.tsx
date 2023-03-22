import Document, { Html, Head, Main, NextScript } from 'next/document';
import { DocumentContext } from 'next/document';
import Script from 'next/script';

const MyDocument = () => {
  return (
    <Html>
      <Head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE});
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id='google-analytics'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6DT5Z8');
            `,
          }}
        />
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6DT5Z8"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
};

export default MyDocument;
