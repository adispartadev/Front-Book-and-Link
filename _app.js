import App from 'next/app';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // Your code to be executed on every app boot goes here
    console.log('App is booting...');

    // Fetch initial data or perform any necessary actions here

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;