import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { useCallback, useState } from "react";

function Facebook() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const FB_REDIRECT_URI = "http://localhost:5174/";

  const onLoginFbStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFbSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);
  return (
    <>
      {provider && profile && `User (${profile?.name}) Logged In`}
      <LoginSocialFacebook
        appId={import.meta.env.VITE_REACT_APP_FB_APP_ID}
        // fieldsProfile={
        //   "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        // }
        onLoginStart={onLoginFbStart}
        onLogoutSuccess={onLogoutFbSuccess}
        redirect_uri={FB_REDIRECT_URI}
        onResolve={({ provider, data }) => {
          debugger;
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </>
  );
}

export default Facebook;
