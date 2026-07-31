import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-3 mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
          <Icon name="GraduationCap" size={40} color="var(--color-primary)" className="md:w-12 md:h-12 lg:w-14 lg:h-14" />
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
        Welcome Back
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-caption max-w-md mx-auto">
        Sign in to continue your NEET-JEE preparation journey and track your progress
      </p>
    </div>
  );
};

export default LoginHeader;