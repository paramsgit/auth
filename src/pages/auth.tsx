import RegisterForm from "@/components/registerForm";
import SigninForm from "@/components/signinForm";
import SocialButton from "@/components/socialButtons";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";
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
      {tab == "signin" ? (
        <SigninForm callbackUrl={callbackUrl} csrfToken={csrfToken} />
      ) : (
        <RegisterForm />
      )}
      <div className="w-full flex justify-center py-4">
        <div className="max-w-md w-[80%] md:w-full h-[2px] bg-slate-600/20 rounded-lg flex justify-center">
          <span className="-mt-[12px] px-2 bg-white text-slate-400">Or</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center pb-10">
        {providers.map((provider: any) => {
          if (provider.name == "Credentials") return;

          return (
            <SocialButton
              key={provider.id}
              id={provider.id}
              text={
                tab == "signup"
                  ? `Sign Up with ${provider.name}`
                  : `Sign In with ${provider.name}`
              }
              csrfToken={csrfToken}
            />
          );
        })}
      </div>
    </>
  );
};

export default auth;

export async function getServerSideProps(ctx: NextPageContext) {
  const { req, query } = ctx;
  const tab = query.tab ? query.tab : "signin";
  const callbackUrl = query.callbackUrl
    ? query.callbackUrl
    : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(ctx);
  const providers = await getProviders();
  return {
    props: {
      providers: Object.values(providers!),
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
    },
  };
}
