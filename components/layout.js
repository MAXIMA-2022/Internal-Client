import Head from 'next/head'

const Layout = ({children}) => {
  return (
   <>
    <Head>
      <title>MAXIMA 2022</title>
      <link rel="shortcut icon" href="/Logo_MXM.png" />
    </Head>
    {children} 
   </>  
  );
}
 
export default Layout;