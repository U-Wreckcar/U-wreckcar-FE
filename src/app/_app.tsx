import store from "src/redux/store/store";
import { Provider } from "react-redux";

/*
 * Type
 */
import type { AppProps } from "next/app";

export default function APP({ Component, pageProps }: AppProps) {
   return (
      <>
         <Provider store={store}>
            <main>
               <Component {...pageProps} />
            </main>
         </Provider>
      </>
   );
}
