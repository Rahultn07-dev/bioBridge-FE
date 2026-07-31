import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import LoginRedirect from './components/LoginRedirect';

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Register - NEET-JEE Prep Platform</title>
        <meta 
          name="description" 
          content="Create your account and start your personalized NEET/JEE preparation journey with comprehensive analytics, progress tracking, and targeted learning recommendations." 
        />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="bg-card border border-border rounded-lg md:rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-10 elevation-2">
            <RegistrationHeader />
            
            <RegistrationForm />
            
            <SocialRegistration />
            
            <LoginRedirect />
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              By creating an account, you agree to our comprehensive exam preparation platform designed specifically for NEET and JEE aspirants
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;