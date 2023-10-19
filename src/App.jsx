import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const onLoginStart = useCallback(() => {
    // alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const REDIRECT_URI = "http://127.0.0.1:5173";

  const fetchDetails = async (data) => {
    try {
      const accessToken = await axios.post(
        `https://oauth2.googleapis.com/token`,
        {
          code: data.code,
          client_id: import.meta.env.VITE_REACT_APP_GG_APP_ID,
          client_secret: import.meta.env.VITE_REACT_APP_GG_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }
      );
      const user = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken?.data?.access_token}`,
          },
        }
      );
      setProfile(user?.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      {provider && profile && `User (${profile?.name}) Logged In`}
      <LoginSocialGoogle
        client_id={import.meta.env.VITE_REACT_APP_GG_APP_ID}
        onLoginStart={onLoginStart}
        redirect_uri={REDIRECT_URI}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          setProvider(provider);
          fetchDetails(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>

      {/* <LoginSocialFacebook
        appId={import.meta.env.REACT_APP_FB_APP_ID || ""}
        fieldsProfile={
          "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
        }
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook> */}
    </>
  );
}

export default App;
