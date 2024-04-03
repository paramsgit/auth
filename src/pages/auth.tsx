import RegisterForm from "@/components/registerForm"
import SigninForm from "@/components/signinForm"
import SocialButton from "@/components/socialButtons"
import { NextPageContext } from "next"
import { getCsrfToken, getProviders } from "next-auth/react"
const auth = ({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) => {
  return (
    <>
   
    {tab=="signin"? <SigninForm callbackUrl={callbackUrl} csrfToken={csrfToken}/>: <RegisterForm/>}

    <div>
      {providers.map((provider:any)=>{
            if(provider.name == "Credentials") return;

            return <SocialButton 
            key={provider.id}
            id={provider.id}
            text={tab=="signup"?`Sign up with ${provider.name}`:`Sign in with ${provider.name}`}
            csrfToken={csrfToken}
            />
      })}
    </div>
   
    </>
  )
}

export default auth


export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  const providers=await getProviders();
  return {
    props: {
      providers:Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)), callbackUrl,csrfToken}
};
}