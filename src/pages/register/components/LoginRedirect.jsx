import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginRedirect = () => {
  return (
    <div className="text-center pt-4 md:pt-6">
      <p className="text-sm md:text-base text-muted-foreground font-caption">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-primary hover:text-primary/80 font-medium transition-smooth inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded px-1"
        >
          Sign in here
          <Icon name="ArrowRight" size={16} />
        </Link>
      </p>
    </div>
  );
};

export default LoginRedirect;