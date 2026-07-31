import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-2 md:space-y-3 mb-6 md:mb-8 lg:mb-10">
      <Link 
        to="/activity-dashboard" 
        className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 transition-smooth hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background mx-auto"
      >
        <Icon name="GraduationCap" size={32} color="var(--color-primary)" className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </Link>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
        Create Your Account
      </h1>
      
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground font-caption max-w-md mx-auto">
        Start your personalized NEET/JEE preparation journey with comprehensive analytics and progress tracking
      </p>
    </div>
  );
};

export default RegistrationHeader;