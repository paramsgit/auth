import { signIn } from 'next-auth/react';
import * as React from 'react';

interface ISocialButtonProps {
    csrfToken:string;
    text:string;
    id:string;
}

const SocialButton: React.FunctionComponent<ISocialButtonProps> = (props) => {
    const {id,text,csrfToken}=props;
  return <>
   <form method='post' action={`/api/auth/signin/${id}`}>
    <input type="hidden" name="csrfToken" defaultValue={csrfToken}/>
    <button onClick={()=>signIn(id)}>{text}</button>
   </form>
  </>
};

export default SocialButton;
